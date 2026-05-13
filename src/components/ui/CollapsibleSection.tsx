import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: "default" | "amber";
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  variant = "default",
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const bgClass = variant === "amber" ? "bg-amber-400/5 border-amber-400/20" : "bg-white/[0.04] border-white/10";
  const textClass = variant === "amber" ? "text-amber-300" : "text-white";
  const hoverClass = variant === "amber" ? "hover:bg-amber-400/10" : "hover:bg-white/[0.08]";

  return (
    <section className={`rounded-lg border ${bgClass} transition`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 flex items-center justify-between ${hoverClass} transition`}
        type="button"
      >
        <div className="flex items-center gap-2">
          <span className={textClass}>{icon}</span>
          <span className={`text-sm font-semibold ${textClass}`}>{title}</span>
        </div>
        <ChevronDown
          size={18}
          className={`${textClass} transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && <div className="border-t border-white/10 px-4 py-3">{children}</div>}
    </section>
  );
}
