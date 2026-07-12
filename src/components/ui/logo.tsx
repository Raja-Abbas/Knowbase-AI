import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  theme?: "light" | "dark";
}

const sizes = {
  sm: { icon: 28, text: "text-sm" },
  md: { icon: 32, text: "text-base" },
  lg: { icon: 40, text: "text-xl" },
};

export function Logo({
  className,
  size = "md",
  withText = true,
  theme = "dark",
}: LogoProps) {
  const s = sizes[size];
  const isDark = theme === "dark";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDark ? "#60a5fa" : "#2563eb"} />
            <stop offset="100%" stopColor={isDark ? "#818cf8" : "#4f46e5"} />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#logoGrad)" />
        <path
          d="M12 13h5c2.2 0 4 1.6 4 3.5s-1.8 3.5-4 3.5H12V13zm0 7h5.5c2.5 0 4.5 1.7 4.5 3.8S20 31.1 17.5 31.1H12v-11z"
          fill="white"
          opacity="0.95"
        />
        <path
          d="M26 13.5c0 0 3 2.2 3 6.5s-3 6.5-3 6.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <circle cx="29" cy="13" r="1.8" fill="white" opacity="0.5" />
      </svg>
      {withText && (
        <span
          className={cn(
            "font-extrabold tracking-tight",
            s.text,
            isDark ? "text-foreground" : "text-slate-900"
          )}
        >
          KnowBase
        </span>
      )}
    </div>
  );
}
