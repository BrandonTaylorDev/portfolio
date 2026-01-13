/**
 * Parse a local date string (YYYY-MM-DD) into a Date object
 */
export function parseLocalDate(iso?: string | null): Date | null {
  if (!iso) return null;
  const parts = iso.split('-');
  if (parts.length < 3) return null;
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if ([y, m, d].some(v => Number.isNaN(v))) return null;
  return new Date(y, m - 1, d);
}

/**
 * Format a local date string (YYYY-MM-DD) as "Mon Year"
 */
export function formatLocalMonthYear(iso?: string | null): string {
  const d = parseLocalDate(iso);
  return d ? d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '';
}
