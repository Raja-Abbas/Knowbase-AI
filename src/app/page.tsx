import Link from "next/link";
import {
  ArrowRight,
  Check,
  Search,
  MessageSquare,
  FileText,
  Shield,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";

const features = [
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Find anything across your entire knowledge base in milliseconds. Our AI understands context, not just keywords.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description:
      "Ask questions in plain language and get answers with source citations. Like having an expert on every topic your business covers.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Upload PDFs, connect wikis, or add content manually. We chunk, index, and make everything instantly searchable.",
  },
  {
    icon: Globe,
    title: "Multi-Source Import",
    description:
      "Pull in knowledge from Notion, Confluence, Google Docs, Slack, and more. One place for everything.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant infrastructure. Your data stays yours with end-to-end encryption and role-based access.",
  },
  {
    icon: Sparkles,
    title: "Multi-Provider AI",
    description:
      "Choose between OpenAI, Anthropic, or Google Gemini. Swap providers anytime with zero code changes.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect your sources",
    description:
      "Import from existing tools or upload documents directly. We handle the rest — parsing, chunking, and indexing.",
  },
  {
    number: "02",
    title: "AI builds your index",
    description:
      "Our engine processes and connects your content automatically, building a semantic map of your knowledge.",
  },
  {
    number: "03",
    title: "Team gets instant answers",
    description:
      "Anyone on your team can ask questions and get accurate, sourced responses in seconds.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals exploring AI-powered knowledge.",
    features: [
      "50 documents",
      "1 workspace member",
      "100 AI queries / month",
      "Basic search",
      "Community support",
    ],
    cta: "Start free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "For small teams ready to centralize their knowledge.",
    features: [
      "5,000 documents",
      "10 team members",
      "2,000 AI queries / month",
      "Advanced search & filters",
      "Custom workspace branding",
      "Email support",
    ],
    cta: "Start 14-day trial",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mo",
    description: "For organizations that need full control and scale.",
    features: [
      "Unlimited documents",
      "Unlimited members",
      "20,000 AI queries / month",
      "API access",
      "SSO & audit logs",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Start 14-day trial",
    href: "/register",
    highlighted: false,
  },
];

const logos = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Hooli",
  "Piedmont",
  "Wayne Ent.",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/[0.04] blur-[120px]" />
          <div className="absolute top-20 -right-32 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
          <div className="absolute top-40 -left-32 h-[400px] w-[400px] rounded-full bg-sky-500/[0.03] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6 sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/[0.04] px-4 py-1.5 text-[13px] font-medium text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Trusted by 200+ teams worldwide
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Your team&apos;s knowledge,
              <br />
              <span className="gradient-text">
                instantly accessible
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Stop digging through docs, Slack threads, and wikis. KnowBase turns your
              scattered business knowledge into an AI assistant that gives your team
              accurate answers — with sources.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                Launch Dashboard Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center rounded-xl border border-border bg-card/50 px-6 text-sm font-semibold text-foreground hover:bg-muted/80 hover:border-border/80 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                Book a demo
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground/60">
              No credit card required · Free plan available · Setup in 5 minutes
            </p>
          </div>

          {/* Social proof */}
          <div className="mt-20 border-t border-border/50 pt-10">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40 mb-7">
              Trusted by forward-thinking teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
              {logos.map((name) => (
                <span
                  key={name}
                  className="text-sm font-bold text-muted-foreground/20 tracking-wide"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative border-t border-border/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Capabilities
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Built for how teams actually work
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Not another generic wiki. A purpose-built platform that makes your
              business knowledge actionable.
            </p>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/20 card-shadow hover:card-shadow-hover"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08] text-primary transition-colors group-hover:bg-primary/[0.12]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[15px] font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-t border-border/50 bg-muted/20 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Getting started
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Live in three steps
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From signup to your team&apos;s first AI answer in under five minutes.
            </p>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/20">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative border-t border-border/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Pricing
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Simple, predictable pricing
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Start free. Scale as your team grows. No surprises.
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3 items-start">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-2 border-primary bg-card shadow-xl shadow-primary/[0.06] ring-1 ring-primary/10 scale-[1.02]"
                    : "border border-border/60 bg-card card-shadow hover:card-shadow-hover"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/20">
                    Most popular
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground font-medium">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-muted/80 hover:border-border/80"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16 shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/[0.05] blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/[0.05] blur-[80px]" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold text-primary-foreground sm:text-3xl lg:text-4xl tracking-tight">
                Your team deserves better than Ctrl+F
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-primary-foreground/70 text-lg">
                Join 200+ teams using KnowBase to turn scattered knowledge into
                instant answers. Start free — upgrade when you&apos;re ready.
              </p>
              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="group inline-flex h-12 items-center rounded-xl bg-white px-7 text-sm font-bold text-primary shadow-lg hover:bg-white/90 transition-all duration-200"
                >
                  Launch Dashboard Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
