import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Search, MessageSquare, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — visual */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] relative flex-col justify-between bg-primary p-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/[0.06] blur-[80px]" />
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/[0.06] blur-[80px]" />

        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Logo size="md" theme="dark" withText={false} />
            <span className="text-lg font-bold text-white tracking-tight">KnowBase</span>
          </Link>
        </div>

        <div className="relative space-y-10">
          <h2 className="text-2xl font-extrabold text-white leading-snug tracking-tight">
            Build a knowledge base that your team actually uses.
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <Search className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Semantic Search</p>
                <p className="text-sm text-white/60 mt-0.5">Find anything in milliseconds</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI-Powered Answers</p>
                <p className="text-sm text-white/60 mt-0.5">Get sourced responses instantly</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Multi-Provider AI</p>
                <p className="text-sm text-white/60 mt-0.5">OpenAI, Claude, or Gemini</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-sm text-white/40">
          © {new Date().getFullYear()} KnowBase AI
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 sm:px-6 noise-bg">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <Link href="/" className="mb-5">
              <Logo size="lg" theme="dark" />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
