export function getMonday(d) {
  const day = d.getDay();
  const diff = d.getDate() - day + (day ? 1 : -6); // adjust when day is sunday
  d.setDate(diff);
  // Ignore hours
  d.setHours(0, 0, 0, 0);
  return d;
}
