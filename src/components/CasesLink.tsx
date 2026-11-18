import { useState } from "react";
import { createPortal } from "react-dom";
import { config } from "../config";
import CasesModal from "./CasesModal";

/** Простое слово в шапке («Отзывы»): без рамок, по клику открывается модальное окно. */
export default function CasesLink() {
  const [open, setOpen] = useState(false);
  // Поки відгуків немає, кнопку не показуємо
  if (config.cases.items.length === 0) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-slate-600 outline-none transition-colors hover:text-ink"
      >
        {config.cases.button}
      </button>
      {open && createPortal(<CasesModal onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}
