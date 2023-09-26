import { getMonday } from '@carto/react-core';

function formatDateRange({ start, end, formatter }) {
  const startFmt = formatter(start);
  const endFmt = formatter(end);

  return `${startFmt} - ${endFmt}`;
}

const secondstoMs = (s) => 1000 * s;
const minutesToMs = (m) => secondstoMs(60 * m);
const hoursToMs = (h) => minutesToMs(60 * h);

// Auxiliary fns
export function secondsCurrentDateRange(date, stepMultiplier = 1) {
  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    0
  );
  const end = new Date(start.getTime() + secondstoMs(stepMultiplier - 1) + 999);

  const datePrefix = date.toLocaleDateString();
  const formatter = (date) =>
    date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      second: '2-digit'
    });
  if (stepMultiplier === 1) {
    return `${datePrefix} ${formatDateRange({ start, end, formatter })}`;
  }

  return formatDateRange({
    start,
    end,
    formatter: (date) => `${datePrefix} ${formatter(date)}`
  });
}

export function minutesCurrentDateRange(date, stepMultiplier = 1) {
  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    0,
    0
  );
  const end = new Date(
    start.getTime() + minutesToMs(stepMultiplier - 1) + secondstoMs(59)
  );

  return formatDateRange({
    start,
    end,
    formatter: (date) =>
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        second: '2-digit'
      })
  });
}

export function hoursCurrentDateRange(date, stepMultiplier = 1) {
  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    0,
    0,
    0
  );
  const end = new Date(start.getTime() + hoursToMs(stepMultiplier - 1) + minutesToMs(59));

  return formatDateRange({
    start,
    end,
    formatter: (date) =>
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        hour12: true,
        minute: '2-digit'
      })
  });
}

export function daysCurrentDateRange(date, stepMultiplier = 1) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  if (stepMultiplier === 1) {
    return start.toLocaleDateString();
  }

  const end = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + stepMultiplier - 1
  );

  return formatDateRange({
    start,
    end,
    formatter: (date) => date.toLocaleDateString()
  });
}

export function weeksCurrentDateRange(date, stepMultiplier = 1) {
  const startDate = new Date(getMonday(date));
  const startDateFmt = startDate.toLocaleDateString();

  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 6 + 7 * (stepMultiplier - 1)
  );
  const endDateFmt = endDate.toLocaleDateString();
  return `${startDateFmt} - ${endDateFmt}`;
}

export function monthsCurrentDateRange(date, stepMultiplier = 1) {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const startDateFmt = startDate.toLocaleDateString();

  const endDate = new Date(date.getFullYear(), date.getMonth() + stepMultiplier, 0);
  const endDateFmt = endDate.toLocaleDateString();
  return `${startDateFmt} - ${endDateFmt}`;
}

export function yearCurrentDateRange(date, stepMultiplier = 1) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const startDateFmt = startDate.toLocaleDateString();

  const endDate = new Date(date.getFullYear() + (stepMultiplier - 1), 11, 31);
  const endDateFmt = endDate.toLocaleDateString();
  return `${startDateFmt} - ${endDateFmt}`;
}
