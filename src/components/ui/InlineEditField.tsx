import { useState, useRef, useEffect } from "react";
import { Check, X, Pencil } from "lucide-react";
import { useT } from "../../hooks/useT";

interface InlineEditFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "number";
  step?: string;
}

export function InlineEditField({ label, value, onChange, type = "text", step }: InlineEditFieldProps) {
  const t = useT();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const newValue = type === "number" ? parseFloat(tempValue) || 0 : tempValue;
    if (newValue !== value) {
      onChange(newValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(String(value));
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <label className="text-xs font-medium uppercase text-slate-400">{label}</label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type={type}
            step={step}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg border border-amber-400 bg-slate-950 px-3 py-2 text-amber-300 outline-none"
          />
          <button
            onClick={handleSave}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            type="button"
            title={t.inline_btn_confirm}
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5 transition"
            type="button"
            title={t.inline_btn_cancel}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase text-slate-400">{label}</label>
      <button
        onClick={() => setIsEditing(true)}
        type="button"
        className="w-full min-h-[44px] flex items-center justify-between rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 transition hover:border-amber-400/30 hover:bg-zinc-800/80"
      >
        <span className="text-lg font-semibold text-amber-300">{value}</span>
        <Pencil size={16} className="text-slate-400 flex-shrink-0" />
      </button>
    </div>
  );
}
