/**
 * Computes normalized vertical scroll progress in the closed range [0, 1].
 */
export function calculateScrollProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number
): number {
  const maxScrollable = scrollHeight - viewportHeight;
  if (!Number.isFinite(scrollY) || !Number.isFinite(maxScrollable) || maxScrollable <= 0) {
    return 0;
  }

  const ratio = scrollY / maxScrollable;
  return Math.max(0, Math.min(1, ratio));
}

/**
 * Converts a normalized [0, 1] progress value into an integer percentage [0, 100].
 */
export function toProgressPercent(progress: number): number {
  if (!Number.isFinite(progress)) {
    return 0;
  }
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.round(clamped * 100);
}
