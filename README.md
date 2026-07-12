# KnowBase AI

**AI-Powered Knowledge Base & Customer Support Platform**

A multi-tenant SaaS application where businesses can create workspaces, upload documents, manage knowledge sources, and use an AI assistant to answer questions based on their business knowledge.

---

## Live Demo

> [https://knowbase-ai.netlify.app](https://knowbase-ai.netlify.app) *(placeholder)*

## Screenshots

> *Screenshots will be added after deployment. The application features a premium dark-mode UI with blue-slate color palette, Plus Jakarta Sans typography, noise texture backgrounds, and glass morphism effects.*

---

## Features

### Core Platform
- **Multi-Tenant Workspaces** — Create isolated workspaces with team collaboration
- **Authentication** — Secure sign-in with email/password, JWT sessions (NextAuth.js v5)
- **Sign Out** — Working sign out with session clearing and redirect to `/login`
- **User Onboarding** — Step-by-step workspace setup wizard
- **Role-Based Access** — Owner, Admin, and Member roles with permissions

### Knowledge Management
- **Document Upload** — Upload files, add URLs, or create manual entries
- **Knowledge Sources** — Connect multiple data sources per workspace
- **Document Processing** — Automatic text chunking for AI retrieval
- **Source Management** — Monitor, sync, and manage knowledge sources

### AI Assistant
- **RAG-Powered Chat** — AI responses grounded in your business knowledge
- **Multi-Provider Support** — OpenAI, Google Gemini, Anthropic Claude
- **Streaming Responses** — Real-time SSE streaming for AI chat
- **Conversation History** — Persistent chat sessions with search
- **Source Citations** — See which documents informed each response
- **Demo Mode** — Fully functional without API keys (mock responses)

### Dashboard & Analytics
- **Executive Overview** — KPI cards, usage charts, quick actions
- **Token Usage Chart** — Area chart showing weekly token consumption
- **Recent Activity** — Live activity feed with timestamps
- **Usage Analytics** — Token usage, query volume, response metrics
- **Team Management** — Invite members, manage roles, remove members
- **Settings** — Profile, workspace, notifications, API key management
- **Notifications** — Working notification dropdown with unread indicators

### Premium UI Design
- **Plus Jakarta Sans** — Distinctive geometric font (not generic Inter)
- **Blue-Slate Palette** — Refined blue primary (`#1d4ed8`) with warm slate backgrounds
- **Dark Mode** — Deep navy background (`#0b1120`) with blue-tinted surfaces
- **Noise Texture** — Subtle SVG grain overlay for visual depth
- **Glass Morphism** — Backdrop blur effects on navigation and headers
- **Card Shadows** — Multi-layer shadows with hover elevation transitions
- **Gradient Text** — Animated gradient on hero headline
- **Split-Screen Auth** — Branded blue panel with feature highlights on login/register

### Developer Experience
- **TypeScript Strict** — Full type safety, 0 compilation errors
- **Prisma 7** — SQLite via `@prisma/adapter-libsql` (no database server needed)
- **REST API** — Comprehensive API routes for all operations
- **Modular Architecture** — Feature-based folder structure

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Database | SQLite + Prisma 7 |
| Database Adapter | `@prisma/adapter-libsql` |
| Authentication | NextAuth.js v5 (Auth.js) with JWT |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix primitives) |
| AI Integration | OpenAI, Gemini, Claude (provider abstraction) |
| Charts | Recharts |
| Markdown | React Markdown + remark-gfm |
| Forms | React Hook Form + Zod |
| Fonts | Plus Jakarta Sans + IBM Plex Mono |
| State | React Server Components + Client State |

---

## Architecture

```
knowbase-ai/
├── prisma/                    # Database schema (SQLite)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Login, Register (split-screen layout)
│   │   ├── (dashboard)/       # Dashboard, Knowledge, Chat, Analytics, Team, Settings
│   │   ├── api/               # REST API routes + NextAuth catch-all
│   │   ├── privacy/           # Privacy policy
│   │   ├── terms/             # Terms of service
│   │   └── contact/           # Contact page
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives (20+ components)
│   │   ├── layout/            # Sidebar, Header, Marketing Nav/Footer, Dashboard Layout
│   │   ├── dashboard/         # Stats cards, Activity list, Usage chart
│   │   ├── knowledge/         # Document cards, Add source dialog
│   │   └── chat/              # Message bubble, Chat input, Conversation sidebar
│   ├── lib/
│   │   ├── ai/                # AI provider abstraction + RAG pipeline
│   │   ├── prisma.ts          # Database client (libsql adapter)
│   │   ├── auth.ts            # Authentication config (NextAuth v5)
│   │   ├── utils.ts           # Utility functions
│   │   └── validations.ts     # Zod schemas
│   ├── components/
│   │   └── providers.tsx      # SessionProvider wrapper
│   └── types/                 # TypeScript type definitions
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/knowbase-ai.git
cd knowbase-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Push schema to SQLite database
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | SQLite file path (default: `file:prisma/dev.db`) |
| `NEXTAUTH_SECRET` | Yes | Random secret for JWT encryption |
| `NEXTAUTH_URL` | Yes | Application URL (e.g., `http://localhost:3000`) |
| `OPENAI_API_KEY` | No | OpenAI API key for GPT models |
| `GEMINI_API_KEY` | No | Google Gemini API key |
| `CLAUDE_API_KEY` | No | Anthropic Claude API key |

> **Note:** The application runs in demo mode with mock AI responses when no AI API keys are configured. No database server is required — SQLite runs as a local file.

---

## Database Schema

Key models:
- **User** — Authenticated users with profile data
- **Workspace** — Multi-tenant workspace containers
- **WorkspaceMember** — Team membership with roles (Owner, Admin, Member)
- **TeamInvite** — Pending workspace invitations
- **KnowledgeSource** — URL, file, manual, or API knowledge sources
- **Document** — Uploaded content with metadata
- **DocumentChunk** — Text chunks for RAG retrieval
- **Conversation** — Chat session containers
- **Message** — Individual chat messages (user/assistant/system)
- **Subscription** — Plan management per workspace
- **ApiUsage** — Token usage tracking

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/workspaces` | List/create workspaces |
| GET/PATCH/DELETE | `/api/workspaces/[id]` | Workspace CRUD |
| GET/POST | `/api/workspaces/[id]/members` | Team management |
| GET/POST | `/api/documents` | List/create documents |
| GET/PATCH/DELETE | `/api/documents/[id]` | Document CRUD |
| GET/POST | `/api/conversations` | List/create conversations |
| GET/POST | `/api/conversations/[id]/messages` | Chat messages |
| POST | `/api/ai/chat` | AI chat with RAG pipeline (SSE streaming) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features, pricing, CTA |
| `/login` | Sign in (split-screen with branded panel) |
| `/register` | Create account |
| `/dashboard` | Executive overview with KPI cards, charts, activity |
| `/knowledge` | Knowledge source management with table view |
| `/knowledge/sources/[id]` | Source detail with document listing |
| `/documents` | All documents across workspace |
| `/documents/[id]` | Document detail with markdown rendering |
| `/chat` | AI chat interface with conversation sidebar |
| `/conversations` | Conversation history |
| `/analytics` | Usage analytics with charts and metrics |
| `/team` | Team management with invite, roles, remove |
| `/settings` | Profile, workspace, notifications, API keys |
| `/workspace/create` | Create new workspace |
| `/workspace/settings` | Workspace settings |
| `/workspaces` | Switch between workspaces |
| `/onboarding` | First-time setup wizard |
| `/profile` | User profile management |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/contact` | Contact page |

---

## Deployment

### Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
docker build -t knowbase-ai .
docker run -p 3000:3000 knowbase-ai
```

---

## Portfolio Case Study

### The Problem
Businesses struggle to make their internal knowledge accessible. Customer support teams waste hours answering repetitive questions, and employees can't find information trapped in documents, wikis, and spreadsheets.

### The Solution
Built a multi-tenant SaaS platform that transforms scattered business documents into an AI-powered knowledge base. Companies upload their content, and an AI assistant answers questions using Retrieval-Augmented Generation (RAG), grounding responses in actual business data.

### My Role
Full-Stack Developer — designed the database schema, implemented the multi-tenant architecture, built the RAG pipeline, developed the AI chat interface, created the dashboard analytics, and delivered a polished SaaS UI with premium design.

### Technologies
Next.js 16, TypeScript, SQLite, Prisma 7, NextAuth.js v5, Tailwind CSS v4, shadcn/ui, OpenAI/Gemini/Claude API integration, Recharts, React Markdown

### Key Technical Decisions
- **SQLite over PostgreSQL** for zero-config local development (production can swap to PostgreSQL)
- **Prisma 7 with `@prisma/adapter-libsql`** for modern adapter-based database connections
- **Plus Jakarta Sans** font for distinctive, premium typography
- **Noise texture + glass morphism** for visual depth beyond typical SaaS templates
- **Split-screen auth layout** with branded feature panel

### Outcome
Production-ready platform with multi-workspace support, role-based access control, real-time AI chat with source citations, usage analytics, notification system, and subscription management architecture.

---

## Upwork Portfolio

**Title:** AI-Powered Knowledge Base & Customer Support Platform

**Description:**
Built a complete multi-tenant SaaS platform that enables businesses to upload documents, build searchable knowledge bases, and deploy AI assistants that answer customer questions using RAG (Retrieval-Augmented Generation). Features include workspace isolation, team collaboration with role-based access, document processing pipeline, real-time streaming AI chat with source citations, usage analytics dashboard, notification system, and subscription management. Premium UI with Plus Jakarta Sans typography, noise texture backgrounds, glass morphism effects, and split-screen auth layout. Designed for production deployment with SQLite (swap to PostgreSQL for scale).

**Skills/Tags:** Next.js, React, TypeScript, Prisma, SQLite, OpenAI, RAG, SaaS, Tailwind CSS, shadcn/ui, Authentication, Multi-Tenant, Full-Stack Development, AI Integration, REST API, NextAuth.js

**GitHub Repository:** `knowbase-ai` — "Multi-tenant SaaS knowledge base with RAG-powered AI assistant, built with Next.js 16, TypeScript, Prisma 7, and Plus Jakarta Sans."

---

## License

MIT
