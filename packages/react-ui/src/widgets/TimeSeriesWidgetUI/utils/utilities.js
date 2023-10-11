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

export function findItemIndexByTime(timestamp, data) {
  for (let idx = 0; idx < data.length; idx++) {
    const currentDate = data[idx].name;
    const upperCloseDate = idx < data.length ? data[idx + 1]?.name : currentDate;
    const lowerCloseDate = idx > 0 ? data[idx - 1]?.name : currentDate;
    const upperDiff = Math.abs(currentDate - upperCloseDate);
    const lowerDiff = Math.abs(currentDate - lowerCloseDate);
    const lowerBound = currentDate - lowerDiff * 0.5,
      upperBound = currentDate + upperDiff * 0.5;

    if (isFinite(lowerBound) && isFinite(upperBound)) {
      if (timestamp >= lowerBound && timestamp <= upperBound) {
        return idx;
      }
    } else if (isFinite(lowerBound)) {
      if (timestamp >= lowerBound) {
        return idx;
      }
    } else if (isFinite(upperBound)) {
      if (timestamp <= upperBound) {
        return idx;
      }
    }
  }
}

export function countDistinctTimePoints(data) {
  let lastTime = undefined;
  let result = 0;
  for (const { name: time } of data) {
    if (time === lastTime) continue;
    lastTime = time;
    result++;
  }
  return result;
}
