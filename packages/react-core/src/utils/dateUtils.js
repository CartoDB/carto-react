/**
 * Returns midnight (local time) on the Monday preceeding a given date, in
 * milliseconds since the UNIX epoch.
 */
export function getMonday(date) {
  const dateCp = new Date(date);
  const day = dateCp.getDay();
  const diff = dateCp.getDate() - day + (day ? 1 : -6); // adjust when day is sunday
  dateCp.setDate(diff);
  dateCp.setHours(0, 0, 0, 0);
  return dateCp.getTime();
}

/**
 * Returns midnight (UTC) on the Monday preceeding a given date, in
 * milliseconds since the UNIX epoch.
 */
export function getUTCMonday(date) {
  const dateCp = new Date(date);
  const day = dateCp.getUTCDay();
  const diff = dateCp.getUTCDate() - day + (day ? 1 : -6); // adjust when day is sunday
  dateCp.setUTCDate(diff);
  return Date.UTC(dateCp.getUTCFullYear(), dateCp.getUTCMonth(), dateCp.getUTCDate());
}
