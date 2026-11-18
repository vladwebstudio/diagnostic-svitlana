import { useState } from "react";
import { MIN, STEP, fmtKg, snap } from "../lib/weight";

interface Props {
  label: string;
  tone: "rose" | "mint";
  kg: number; // 0 = не задано
  max: number;
  onChange: (kg: number) => void;
}

const tones = {
  rose: { c: "#e11d48", halo: "rgba(225,29,72,.18)", track: "#fecdd3", box: "border-rose-200 bg-rose-50 text-rose-600" },
  mint: { c: "#16a34a", halo: "rgba(22,163,74,.18)", track: "#bbf7d0", box: "border-emerald-200 bg-emerald-50 text-emerald-600" },
};

export default function WeightSlider({ label, tone, kg, max, onChange }: Props) {
  const t = tones[tone];
  const safe = Number.isFinite(kg) ? kg : 0;
  const pct = safe > 0 ? Math.min(100, Math.max(0, ((safe - MIN) / (max - MIN)) * 100)) : 0;
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");

  const commit = (raw: string) => {
    const n = Number(raw.replace(",", "."));
    if (!raw.trim() || !Number.isFinite(n) || n <= 0) return onChange(0);
    onChange(Math.min(max, Math.max(MIN, snap(n))));
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[0.6875rem] font-semibold tracking-[0.14em] text-slate-600">{label}</label>
        <div className={`flex w-[110px] items-center rounded-xl border px-3 py-1 font-mono text-sm font-bold ${t.box}`}>
          <input
            inputMode="decimal"
            placeholder="—"
            value={focused ? draft : safe > 0 ? fmtKg(safe) : ""}
            onFocus={(e) => {
              setFocused(true);
              setDraft(safe > 0 ? fmtKg(safe) : "");
              e.currentTarget.select();
            }}
            onChange={(e) => setDraft(e.target.value.replace(/[^\d.,]/g, ""))}
            onBlur={() => {
              setFocused(false);
              commit(draft);
            }}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="w-full bg-transparent text-right outline-none placeholder:text-slate-400"
            aria-label={label}
          />
          <span className="ml-1">кг</span>
        </div>
      </div>
      <input
        type="range"
        min={MIN}
        max={max}
        step={STEP}
        value={safe > 0 ? safe : MIN}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider"
        aria-label={`${label}, повзунок`}
        style={{ "--c": t.c, "--halo": t.halo, "--track": t.track, "--p": `${pct}%` } as React.CSSProperties}
      />
      <div className="mt-1.5 flex justify-between font-mono text-[0.625rem] text-slate-500">
        <span>{MIN} кг</span>
        <span>{max} кг</span>
      </div>
    </div>
  );
}
