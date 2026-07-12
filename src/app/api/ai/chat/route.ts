import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { runRAGPipeline } from "@/lib/ai/rag";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { message, workspaceId, conversationId } = body;

    if (!message || !workspaceId) {
      return new Response(
        JSON.stringify({ error: "message and workspaceId are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const member = await prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: session.user.id,
          workspaceId,
        },
      },
    });

    if (!member) {
      return new Response(
        JSON.stringify({ error: "Access denied" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          title: message.slice(0, 100),
          workspaceId,
          userId: session.user.id,
        },
      });
    }

    const userMessage = await prisma.message.create({
      data: {
        role: "USER",
        content: message,
        conversationId: conversation.id,
      },
    });

    const relevantDocuments = await prisma.document.findMany({
      where: { workspaceId },
      orderBy: { updatedAt: "desc" },
      take: 50,
      select: { id: true, title: true, content: true },
    });

    const ragResult = await runRAGPipeline(
      message,
      relevantDocuments.map((doc) => ({
        id: doc.id,
        title: doc.title,
        content: doc.content || "",
      }))
    );

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const sources = ragResult.sources || [];
          const sourceMetadata = JSON.stringify({ sources });
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "sources", sources })}\n\n`)
          );

          let fullResponse = "";

          const chunks = ragResult.response.split(" ");
          for (let i = 0; i < chunks.length; i++) {
            const chunk = (i === 0 ? "" : " ") + chunks[i];
            fullResponse += chunk;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "chunk", content: chunk })}\n\n`
              )
            );

            await new Promise((resolve) => setTimeout(resolve, 20));
          }

          const assistantMessage = await prisma.message.create({
            data: {
              role: "ASSISTANT",
              content: fullResponse,
              conversationId: conversation.id,
               metadata: {
                 sources: sources.map((s) => ({
                   documentId: s.documentId,
                   title: s.documentTitle,
                   relevance: s.score,
                 })),
                tokenUsage: ragResult.tokenUsage || 0,
              },
            },
          });

          await prisma.conversation.update({
            where: { id: conversation.id },
            data: { updatedAt: new Date() },
          });

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "done",
                messageId: assistantMessage.id,
                conversationId: conversation.id,
              })}\n\n`
            )
          );

          controller.close();
        } catch (streamError) {
          console.error("Stream error:", streamError);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", error: "Failed to generate response" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("POST /api/ai/chat error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
