// Utility to manage multiple values that can produce
// a timestamp. This cover every value that can be used
// as input for Date constructor and the Date object itself.
export function getTimestamp(date) {
  // date arg is a Date instance
  if (date.getTime) return date.getTime();
  // date is a valid Date constructor input
  const timestamp = new Date(date).getTime();
  // It's valid if getTime result is finite
  if (isFinite(timestamp)) return timestamp;
}

export function getDate(date) {
  if (date.getTime) return date;
  return new Date(date);
}
