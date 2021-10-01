export function getMonday(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day ? 1 : -6); // adjust when day is sunday
  date.setDate(diff);
  // Ignore hours
  date.setHours(0, 0, 0, 0);
  return date;
}
