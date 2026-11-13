const IST_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

/**
 * Formats a Date in strict 24-hour Indian Standard Time (Asia/Kolkata, HH:mm:ss).
 */
export function formatIstTime24h(date: Date = new Date()): string {
  return IST_FORMATTER.format(date);
}
