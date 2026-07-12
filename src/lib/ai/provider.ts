export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIProviderOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface AIProvider {
  chat(messages: ChatMessage[], options?: AIProviderOptions): Promise<string>;
  generateEmbedding(text: string): Promise<number[]>;
  summarize(text: string): Promise<string>;
  analyzeDocument(content: string): Promise<{
    summary: string;
    topics: string[];
    sentiment: string;
  }>;
}

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = "https://api.openai.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: ChatMessage[], options?: AIProviderOptions): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: options?.model ?? "gpt-4o-mini",
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI embedding error: ${error}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  }

  async summarize(text: string): Promise<string> {
    return this.chat([
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes documents concisely. Provide a clear, well-structured summary.",
      },
      { role: "user", content: `Summarize the following document:\n\n${text}` },
    ]);
  }

  async analyzeDocument(content: string): Promise<{
    summary: string;
    topics: string[];
    sentiment: string;
  }> {
    const response = await this.chat([
      {
        role: "system",
        content:
          'Analyze the document and respond in JSON format: { "summary": "...", "topics": ["topic1", "topic2"], "sentiment": "positive|negative|neutral" }',
      },
      {
        role: "user",
        content: `Analyze this document:\n\n${content}`,
      },
    ]);

    try {
      return JSON.parse(response);
    } catch {
      return {
        summary: response,
        topics: [],
        sentiment: "neutral",
      };
    }
  }
}

export class GeminiProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: ChatMessage[], options?: AIProviderOptions): Promise<string> {
    const model = options?.model ?? "gemini-2.0-flash";
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const systemInstruction = messages.find((m) => m.role === "system");

    const body: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 2048,
      },
    };

    if (systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: systemInstruction.content }],
      };
    }

    const response = await fetch(
      `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(
      `${this.baseUrl}/models/text-embedding-004:embedContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "models/text-embedding-004",
          content: { parts: [{ text }] },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini embedding error: ${error}`);
    }

    const data = await response.json();
    return data.embedding.values;
  }

  async summarize(text: string): Promise<string> {
    return this.chat([
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes documents concisely. Provide a clear, well-structured summary.",
      },
      { role: "user", content: `Summarize the following document:\n\n${text}` },
    ]);
  }

  async analyzeDocument(content: string): Promise<{
    summary: string;
    topics: string[];
    sentiment: string;
  }> {
    const response = await this.chat([
      {
        role: "user",
        content: `Analyze this document and respond in JSON format with keys "summary", "topics" (array), and "sentiment" (positive/negative/neutral):\n\n${content}`,
      },
    ]);

    try {
      return JSON.parse(response);
    } catch {
      return { summary: response, topics: [], sentiment: "neutral" };
    }
  }
}

export class ClaudeProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = "https://api.anthropic.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: ChatMessage[], options?: AIProviderOptions): Promise<string> {
    const systemMessage = messages.find((m) => m.role === "system");
    const chatMessages = messages.filter((m) => m.role !== "system");

    const body: Record<string, unknown> = {
      model: options?.model ?? "claude-sonnet-4-20250514",
      max_tokens: options?.maxTokens ?? 2048,
      messages: chatMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      temperature: options?.temperature ?? 0.7,
    };

    if (systemMessage) {
      body.system = systemMessage.content;
    }

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error: ${error}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude embedding error: ${error}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  }

  async summarize(text: string): Promise<string> {
    return this.chat([
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes documents concisely. Provide a clear, well-structured summary.",
      },
      { role: "user", content: `Summarize the following document:\n\n${text}` },
    ]);
  }

  async analyzeDocument(content: string): Promise<{
    summary: string;
    topics: string[];
    sentiment: string;
  }> {
    const response = await this.chat([
      {
        role: "system",
        content:
          'Analyze the document and respond in JSON format: { "summary": "...", "topics": ["topic1", "topic2"], "sentiment": "positive|negative|neutral" }',
      },
      {
        role: "user",
        content: `Analyze this document:\n\n${content}`,
      },
    ]);

    try {
      return JSON.parse(response);
    } catch {
      return { summary: response, topics: [], sentiment: "neutral" };
    }
  }
}

export class MockProvider implements AIProvider {
  async chat(messages: ChatMessage[], _options?: AIProviderOptions): Promise<string> {
    const lastMessage = messages[messages.length - 1]?.content ?? "";

    if (lastMessage.toLowerCase().includes("summarize")) {
      return "This is a mock summary of the provided content. In production, this would be generated by an AI model. The document covers several key topics and provides detailed analysis of the subject matter.";
    }

    if (lastMessage.toLowerCase().includes("analyze")) {
      return JSON.stringify({
        summary: "This is a mock analysis of the provided document.",
        topics: ["technology", "knowledge-management", "artificial-intelligence"],
        sentiment: "neutral",
      });
    }

    return `This is a mock AI response for demo mode. You asked: "${lastMessage.slice(0, 100)}${lastMessage.length > 100 ? "..." : ""}". To get real AI responses, configure one of the supported API providers (OpenAI, Gemini, or Claude) in your environment variables.`;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const dimensions = 1536;
    const embedding: number[] = [];
    let seed = 0;
    for (let i = 0; i < text.length; i++) {
      seed = (seed * 31 + text.charCodeAt(i)) % 2147483647;
    }
    for (let i = 0; i < dimensions; i++) {
      seed = (seed * 1103515245 + 12345) % 2147483647;
      embedding.push((seed / 2147483647) * 2 - 1);
    }
    return embedding;
  }

  async summarize(text: string): Promise<string> {
    const wordCount = text.split(/\s+/).length;
    return `This is a mock summary of a ${wordCount}-word document. In production, this would be an AI-generated summary highlighting the key points and themes of the content.`;
  }

  async analyzeDocument(_content: string): Promise<{
    summary: string;
    topics: string[];
    sentiment: string;
  }> {
    return {
      summary:
        "This is a mock document analysis. In production, this would provide AI-powered insights about the document's content, structure, and key themes.",
      topics: ["mock-data", "demo", "sample-content"],
      sentiment: "neutral",
    };
  }
}

let providerInstance: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (providerInstance) return providerInstance;

  if (process.env.OPENAI_API_KEY) {
    providerInstance = new OpenAIProvider(process.env.OPENAI_API_KEY);
  } else if (process.env.GEMINI_API_KEY) {
    providerInstance = new GeminiProvider(process.env.GEMINI_API_KEY);
  } else if (process.env.CLAUDE_API_KEY) {
    providerInstance = new ClaudeProvider(process.env.CLAUDE_API_KEY);
  } else {
    providerInstance = new MockProvider();
  }

  return providerInstance;
}

export async function generateChatResponse(
  messages: ChatMessage[],
  options?: AIProviderOptions
): Promise<string> {
  const provider = getAIProvider();
  return provider.chat(messages, options);
}
