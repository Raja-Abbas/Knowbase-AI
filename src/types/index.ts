export enum MemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  VIEWER = "VIEWER",
}

export enum SourceType {
  FILE = "FILE",
  URL = "URL",
  TEXT = "TEXT",
  API = "API",
}

export enum SourceStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum MessageRole {
  USER = "USER",
  ASSISTANT = "ASSISTANT",
  SYSTEM = "SYSTEM",
}

export enum PlanType {
  FREE = "FREE",
  STARTER = "STARTER",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  PAST_DUE = "PAST_DUE",
  TRIALING = "TRIALING",
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: MemberRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  type: SourceType;
  status: SourceStatus;
  url: string | null;
  content: string | null;
  metadata: Record<string, unknown> | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  sourceId: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentChunk {
  id: string;
  content: string;
  embedding: number[] | null;
  documentId: string;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  title: string | null;
  workspaceId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  conversationId: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  plan: PlanType;
  status: SubscriptionStatus;
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiUsage {
  id: string;
  userId: string;
  tokensUsed: number;
  requestCount: number;
  periodStart: Date;
  periodEnd: Date;
  createdAt: Date;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: MemberRole;
  workspaceId: string;
  invitedBy: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// Extended types

export interface WorkspaceWithMembers extends Workspace {
  members: (WorkspaceMember & { user: Pick<User, "id" | "name" | "email" | "image"> })[];
  _count: { members: number; documents: number };
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

export interface DocumentWithSource extends Document {
  source: KnowledgeSource | null;
  _count: { chunks: number };
}

export interface KnowledgeSourceWithDocuments extends KnowledgeSource {
  documents: Document[];
  _count: { documents: number };
}

export interface UserWithSubscription extends User {
  subscription: Subscription | null;
  _count: { workspaces: number };
}

export interface DashboardStats {
  totalDocuments: number;
  totalSources: number;
  totalConversations: number;
  totalMembers: number;
  storageUsed: number;
  apiCallsThisMonth: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: "document_created" | "source_added" | "member_joined" | "conversation_started";
  title: string;
  description: string;
  timestamp: Date;
  userId: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  sources?: { documentId: string; title: string; chunk: string }[];
  timestamp: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateWorkspaceForm {
  name: string;
  description?: string;
}

export interface InviteMemberForm {
  email: string;
  role: MemberRole;
}

export interface CreateDocumentForm {
  title: string;
  content: string;
  sourceId?: string;
}

export interface UpdateSettingsForm {
  name: string;
  email: string;
}

export interface ChatMessageForm {
  message: string;
}
