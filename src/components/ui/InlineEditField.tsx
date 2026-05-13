import { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";

interface InlineEditFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "number";
  step?: string;
}

export function InlineEditField({ label, value, onChange, type = "text", step }: InlineEditFieldProps) {
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
        <label className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</label>
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
            className="rounded-lg bg-emerald-600 p-2 text-white hover:bg-emerald-700"
            type="button"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="rounded-lg border border-white/10 p-2 text-slate-400 hover:bg-white/5"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</label>
      <button
        onClick={() => setIsEditing(true)}
        type="button"
        className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-left transition hover:border-amber-400/30 hover:bg-slate-900"
      >
        <span className="text-lg font-semibold text-amber-300">{value}</span>
      </button>
    </div>
  );
}
