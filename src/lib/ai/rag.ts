import { getAIProvider, type ChatMessage } from "./provider";

export function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + chunkSize, words.length);
    chunks.push(words.slice(start, end).join(" "));
    start += chunkSize - overlap;

    if (start >= words.length) break;
  }

  return chunks.filter((chunk) => chunk.trim().length > 0);
}

function getWordFrequency(text: string): Map<string, number> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const freq = new Map<string, number>();
  for (const word of words) {
    freq.set(word, (freq.get(word) ?? 0) + 1);
  }
  return freq;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  const allWords = new Set([...a.keys(), ...b.keys()]);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const word of allWords) {
    const valA = a.get(word) ?? 0;
    const valB = b.get(word) ?? 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export interface ChunkForSearch {
  id: string;
  content: string;
  documentId: string;
}

export async function findRelevantChunks(
  query: string,
  chunks: ChunkForSearch[],
  topK: number = 5
): Promise<(ChunkForSearch & { score: number })[]> {
  const queryFreq = getWordFrequency(query);

  const scored = chunks.map((chunk) => {
    const chunkFreq = getWordFrequency(chunk.content);
    const score = cosineSimilarity(queryFreq, chunkFreq);
    return { ...chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

export function buildRAGContext(chunks: string[]): string {
  if (chunks.length === 0) return "No relevant context found.";

  return chunks
    .map((chunk, i) => `[Context ${i + 1}]\n${chunk}`)
    .join("\n\n");
}

export async function generateRAGResponse(
  query: string,
  context: string
): Promise<string> {
  const provider = getAIProvider();

  const messages = [
    {
      role: "system" as const,
      content: `You are a helpful AI assistant for a knowledge base application. Answer the user's question based on the provided context. If the context doesn't contain enough information to answer the question, say so honestly. Always cite which part of the context you used when possible.

Context:
${context}`,
    },
    {
      role: "user" as const,
      content: query,
    },
  ];

  return provider.chat(messages, { temperature: 0.3, maxTokens: 1024 });
}

export interface RAGPipelineResult {
  response: string;
  sources: { documentId: string; documentTitle: string; score: number }[];
  tokenUsage: number;
}

export async function runRAGPipeline(
  query: string,
  documents: { id: string; title: string; content: string }[]
): Promise<RAGPipelineResult> {
  const allChunks: ChunkForSearch[] = [];

  for (const doc of documents) {
    const chunks = chunkText(doc.content, 500, 100);
    chunks.forEach((content, index) => {
      allChunks.push({
        id: `${doc.id}-chunk-${index}`,
        content,
        documentId: doc.id,
      });
    });
  }

  const relevantChunks = await findRelevantChunks(query, allChunks, 5);
  const contextChunks = relevantChunks.map((c) => c.content);
  const context = buildRAGContext(contextChunks);
  const response = await generateRAGResponse(query, context);

  const sourceMap = new Map<string, { documentId: string; score: number }>();
  for (const chunk of relevantChunks) {
    const existing = sourceMap.get(chunk.documentId);
    if (!existing || chunk.score > existing.score) {
      sourceMap.set(chunk.documentId, {
        documentId: chunk.documentId,
        score: chunk.score,
      });
    }
  }

  const sources = Array.from(sourceMap.entries()).map(([docId, data]) => ({
    documentId: data.documentId,
    documentTitle: documents.find((d) => d.id === docId)?.title ?? "Unknown",
    score: data.score,
  }));

  const estimatedTokens = Math.ceil(
    (context.length + response.length + query.length) / 4
  );

  return { response, sources, tokenUsage: estimatedTokens };
}
