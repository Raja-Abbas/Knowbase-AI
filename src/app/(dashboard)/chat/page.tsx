"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { ConversationSidebar } from "@/components/chat/conversation-sidebar";
import { MessageBubble, Message } from "@/components/chat/message-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageAt: Date;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "conv_1",
    title: "API Rate Limits & Best Practices",
    lastMessage: "Rate limits are enforced per API key...",
    lastMessageAt: new Date("2026-07-12T09:15:00"),
    messages: [
      {
        id: "msg_1",
        role: "user",
        content:
          "What are the API rate limits for the Professional plan?",
        timestamp: new Date("2026-07-12T09:10:00"),
      },
      {
        id: "msg_2",
        role: "assistant",
        content:
          "Based on the billing documentation, the Professional plan includes the following API rate limits:\n\n- **Standard endpoints**: 1,000 requests per minute\n- **Search endpoints**: 500 requests per minute\n- **Bulk operations**: 50 requests per minute\n\nRate limits are enforced per API key. If you need higher limits, you can contact sales for a custom Enterprise plan.",
        timestamp: new Date("2026-07-12T09:10:30"),
        sources: [
          { id: "doc_5", title: "Billing & Subscription Plans" },
          { id: "doc_2", title: "API Authentication & Security" },
        ],
      },
      {
        id: "msg_3",
        role: "user",
        content:
          "What happens when I exceed the rate limit?",
        timestamp: new Date("2026-07-12T09:12:00"),
      },
      {
        id: "msg_4",
        role: "assistant",
        content:
          "When you exceed the rate limit, the API returns a `429 Too Many Requests` response with a `Retry-After` header indicating how many seconds to wait.\n\nBest practices for handling rate limits:\n\n1. **Implement exponential backoff** - Start with a 1-second delay and double it on each retry\n2. **Cache responses** - Store frequently accessed data to reduce API calls\n3. **Batch requests** - Use bulk endpoints when processing multiple items\n4. **Monitor usage** - Track your API usage in the dashboard analytics\n\nThe API also returns current rate limit status in response headers: `X-RateLimit-Remaining` and `X-RateLimit-Reset`.",
        timestamp: new Date("2026-07-12T09:12:45"),
        sources: [
          { id: "doc_9", title: "API Rate Limiting Best Practices" },
        ],
      },
    ],
  },
  {
    id: "conv_2",
    title: "Team Permissions Setup",
    lastMessage: "Admins have full access to all features...",
    lastMessageAt: new Date("2026-07-12T08:45:00"),
    messages: [
      {
        id: "msg_5",
        role: "user",
        content:
          "How do team roles and permissions work in KnowBase AI?",
        timestamp: new Date("2026-07-12T08:40:00"),
      },
      {
        id: "msg_6",
        role: "assistant",
        content:
          "KnowBase AI uses role-based access control with three default roles:\n\n**Admin**\n- Full access to all features and settings\n- Manage billing and subscription\n- Invite and remove team members\n- Create and delete knowledge sources\n\n**Editor**\n- Create and modify knowledge sources\n- Upload and edit documents\n- Use AI chat\n- View analytics\n\n**Viewer**\n- Read-only access to the knowledge base\n- Use AI chat for queries\n- View document content\n\nYou can also create custom roles with specific permission combinations under Settings > Roles.",
        timestamp: new Date("2026-07-12T08:40:30"),
        sources: [
          { id: "doc_3", title: "Team Management & Permissions" },
        ],
      },
    ],
  },
  {
    id: "conv_3",
    title: "Document Upload Formats",
    lastMessage: "KnowBase AI supports PDF, DOCX, TXT...",
    lastMessageAt: new Date("2026-07-11T16:30:00"),
    messages: [
      {
        id: "msg_7",
        role: "user",
        content:
          "What file formats can I upload to the knowledge base?",
        timestamp: new Date("2026-07-11T16:25:00"),
      },
      {
        id: "msg_8",
        role: "assistant",
        content:
          "KnowBase AI supports the following file formats for upload:\n\n- **PDF** (.pdf) - Extracts text, preserves structure\n- **Word Documents** (.docx) - Full text extraction with formatting hints\n- **Plain Text** (.txt) - Direct text ingestion\n- **Markdown** (.md) - Preserves heading structure and formatting\n\n**File size limits:**\n- Starter plan: 10MB per file\n- Professional plan: 50MB per file\n- Enterprise plan: 100MB per file\n\nAfter upload, documents are automatically chunked and embedded for AI search. Processing typically takes 1-3 minutes depending on file size.",
        timestamp: new Date("2026-07-11T16:26:00"),
        sources: [
          { id: "doc_1", title: "Getting Started with KnowBase AI" },
        ],
      },
    ],
  },
  {
    id: "conv_4",
    title: "Integration Options",
    lastMessage: "We support Slack, Teams, Notion...",
    lastMessageAt: new Date("2026-07-11T14:00:00"),
    messages: [
      {
        id: "msg_9",
        role: "user",
        content:
          "What third-party integrations are available?",
        timestamp: new Date("2026-07-11T13:55:00"),
      },
      {
        id: "msg_10",
        role: "assistant",
        content:
          "KnowBase AI offers integrations with several popular platforms:\n\n**Communication**\n- Slack - Search knowledge base directly from Slack\n- Microsoft Teams - Bot for team channels\n\n**Documentation**\n- Notion - Sync Notion pages automatically\n- Confluence - Import Confluence spaces\n- Google Drive - Connect Google Docs\n\n**Development**\n- GitHub - Sync README and documentation files\n- GitLab - Import wiki content\n\n**Custom**\n- Webhooks - Build custom integrations\n- REST API - Full programmatic access\n\nAll integrations are configured under Settings > Integrations. Most support automatic sync on a configurable schedule.",
        timestamp: new Date("2026-07-11T13:56:00"),
        sources: [
          { id: "doc_4", title: "Integrations Guide" },
        ],
      },
    ],
  },
];

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState<string>("conv_1");
  const [conversations, setConversations] = useState(mockConversations);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find(
    (c) => c.id === activeConversation
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, isTyping]);

  const handleSendMessage = (content: string) => {
    if (!currentConversation) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              lastMessage: content,
              lastMessageAt: new Date(),
            }
          : conv
      )
    );

    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: "assistant",
        content:
          "Based on the knowledge base, I can help you with that. Let me find the relevant information from your documentation and provide a detailed answer. The information I found suggests there are several approaches you can take, depending on your specific use case and requirements.",
        timestamp: new Date(),
        sources: [{ id: "doc_1", title: "Getting Started with KnowBase AI" }],
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversation
            ? {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                lastMessage: assistantMessage.content,
                lastMessageAt: new Date(),
              }
            : conv
        )
      );
      setIsTyping(false);
    }, 2000);
  };

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      title: "New Conversation",
      lastMessage: "",
      lastMessageAt: new Date(),
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversation(newConv.id);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeConversation === id && filtered.length > 0) {
        setActiveConversation(filtered[0].id);
      }
      return filtered;
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversation}
        onSelectConversation={setActiveConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {currentConversation?.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Start a conversation</h3>
              <p className="text-muted-foreground mt-1 max-w-sm">
                Ask questions about your knowledge base and get AI-powered
                answers with source citations.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {currentConversation?.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={handleSendMessage}
              disabled={isTyping}
              placeholder="Ask a question about your knowledge base..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
