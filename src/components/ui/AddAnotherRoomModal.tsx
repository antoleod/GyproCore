import { ArrowRight, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useT } from "../../hooks/useT";

interface AddAnotherRoomModalProps {
  isOpen: boolean;
  onAddAnother: () => void;
  onFinish: () => void;
}

export function AddAnotherRoomModal({ isOpen, onAddAnother, onFinish }: AddAnotherRoomModalProps) {
  const t = useT();
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-slate-950 p-6 space-y-4 shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={onFinish}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">{t.modal_heading}</h2>
          <p className="text-sm text-slate-400">
            {t.modal_subtitle}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onFinish}
            className="flex-1 rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 transition"
            type="button"
          >
            {t.modal_btn_finish}
          </button>
          <button
            onClick={onAddAnother}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition"
            type="button"
          >
            <Plus size={16} />
            {t.modal_btn_add}
          </button>
        </div>

        {/* Help text */}
        <p className="text-xs text-slate-500 text-center">
          {t.modal_hint.replace("ESC", "")} <kbd className="bg-white/10 px-1.5 py-0.5 rounded">ESC</kbd>
        </p>
      </motion.div>
    </motion.div>
  );
}
