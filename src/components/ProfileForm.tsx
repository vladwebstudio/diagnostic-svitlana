import { config } from "../config";
import type { ClientState } from "../lib/types";
import { fmtKg } from "../lib/weight";
import WeightSlider from "./WeightSlider";
import Segmented from "./Segmented";
import Select from "./Select";

interface Props {
  state: ClientState;
  update: (patch: Partial<ClientState>) => void;
}

const label = "mb-2 block text-[0.6875rem] font-semibold tracking-[0.14em] text-slate-500";
const input =
  "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-ink focus:bg-white";

export default function ProfileForm({ state, update }: Props) {
  const { intro } = config;
  const { weightA, weightB } = state;
  const ready = weightA > 0 && weightB > 0;
  const lose = ready ? Math.max(0, weightA - weightB) : 0;
  const percent = ready && weightA > 0 ? (lose / weightA) * 100 : null;

  return (
    <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-line sm:p-6">
      <div className="space-y-5">
        <div>
          <label className={label} htmlFor="client-name">{intro.nameLabel}</label>
          <input
            id="client-name"
            className={input}
            placeholder={intro.namePlaceholder}
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        <div>
          <label className={label} htmlFor="profession">{intro.professionLabel}</label>
          <Select
            id="profession"
            value={state.profession}
            options={config.professions}
            placeholder={intro.professionPlaceholder}
            onChange={(profession) => update({ profession })}
          />
        </div>

        <hr className="border-line" />

        <WeightSlider
          label={intro.weightALabel}
          tone="rose"
          kg={state.weightA}
          max={config.limits.weight}
          onChange={(weightA) => update({ weightA })}
        />
        <WeightSlider
          label={intro.weightBLabel}
          tone="mint"
          kg={state.weightB}
          max={config.limits.weight}
          onChange={(weightB) => update({ weightB })}
        />

        <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3">
          <div>
            <div className="text-[0.625rem] font-semibold tracking-[0.14em] text-slate-500">{intro.growthLabel}</div>
            <div className="mt-0.5 font-mono">
              <span className="text-xl font-bold text-emerald-600">
                {ready ? `−${fmtKg(lose)}` : "—"}
              </span>
              <span className="ml-1.5 text-xs text-slate-500">кг</span>
            </div>
          </div>
          <span className="rounded-lg border border-emerald-300 bg-emerald-100 px-2.5 py-1 font-mono text-xs font-bold text-emerald-700">
            {percent !== null ? `−${percent.toFixed(0)}%` : "—"}
          </span>
        </div>
        <div>
          <span className={label}>{intro.timeLabel}</span>
          <Segmented
            options={intro.terms.map((t) => ({ label: t.label, value: t.months }))}
            value={state.termMonths || ""}
            onChange={(termMonths) => update({ termMonths })}
          />
        </div>
      </div>
    </section>
  );
}
