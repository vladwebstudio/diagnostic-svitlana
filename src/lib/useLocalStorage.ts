import { useCallback, useEffect, useState } from "react";

/** useState, который сохраняется в localStorage (безопасно, если хранилище недоступно). */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initial;
      const saved = { ...initial, ...JSON.parse(raw) } as T & { weightA?: number; weightB?: number };
      // Старые/битые данные (NaN, строки, отрицательные числа) -> сбрасываем вес
      const okNum = (v: unknown) => typeof v === "number" && Number.isFinite(v) && v >= 0;
      if (!okNum(saved.weightA) || !okNum(saved.weightB)) {
        const init = initial as unknown as { weightA: number; weightB: number };
        return { ...saved, weightA: init.weightA, weightB: init.weightB } as T;
      }
      return saved as T;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      // Пустое состояние не храним: после «Очистить» в localStorage ничего не остаётся.
      if (JSON.stringify(value) === JSON.stringify(initial)) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value]);

  /** Удаляет сохранённые данные и возвращает пустое состояние. */
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setValue(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue, clear] as const;
}
