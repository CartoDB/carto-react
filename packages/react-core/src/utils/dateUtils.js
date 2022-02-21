export function getMonday(date) {
  const dateCp = new Date(date);
  const day = dateCp.getDay();
  const diff = dateCp.getDate() - day + (day ? 1 : -6); // adjust when day is sunday
  dateCp.setDate(diff);
  return Date.UTC(dateCp.getUTCFullYear(), dateCp.getUTCMonth(), dateCp.getUTCDate());
}
