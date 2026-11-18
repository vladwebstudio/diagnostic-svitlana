/** Шаг слайдеров веса, кг */
export const STEP = 0.5;
export const MIN = 40;

/** Округление до ближайшего шага */
export const snap = (v: number) => Math.round(v / STEP) * STEP;

/** 72.5 -> "72,5", 70 -> "70" */
export const fmtKg = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1).replace(".", ","));
