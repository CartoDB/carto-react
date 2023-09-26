import { GroupDateTypes, getMonday } from '@carto/react-core';

const fullTimeFormatters = {
  [GroupDateTypes.YEARS]: formatLocalDate,
  [GroupDateTypes.MONTHS]: formatLocalDate,
  [GroupDateTypes.WEEKS]: formatLocalDate,
  [GroupDateTypes.DAYS]: formatLocalDate,
  [GroupDateTypes.HOURS]: formatDateAndTimeWithMinutes,
  [GroupDateTypes.MINUTES]: formatDateAndTimeWithSeconds,
  [GroupDateTypes.SECONDS]: formatDateAndTimeWithSeconds
};

const intervalCalculators = {
  [GroupDateTypes.YEARS]: getBucketIntervalYears,
  [GroupDateTypes.MONTHS]: getBucketIntervalMonths,
  [GroupDateTypes.WEEKS]: getBucketIntervalWeeks,
  [GroupDateTypes.DAYS]: getBucketIntervalDays,
  [GroupDateTypes.HOURS]: getBucketIntervalHours,
  [GroupDateTypes.MINUTES]: getBucketIntervalMinutes,
  [GroupDateTypes.SECONDS]: getBucketIntervalSeconds
};

export function formatTime({ date, stepSize }) {
  const formatter = fullTimeFormatters[stepSize];
  if (!formatter) throw new Error('formatTime: invalid stepSize');

  return formatter(date);
}

const SHORTENED_RANGES_WHEN_NO_MULTIPLIES = [GroupDateTypes.SECONDS, GroupDateTypes.DAYS];

/**
 * Format time range.
 *
 * @param {object} props
 * @param {Date} props.start
 * @param {Date} props.end
 * @param {GroupDateTypes=} props.stepSize
 * @returns string, formatted date range
 */
export function formatTimeRange({ start, end, stepSize }) {
  if (start > end) {
    return formatTimeRange({ start: end, end: start, stepSize });
  }

  const formatter = fullTimeFormatters[stepSize];
  if (!formatter) {
    throw new Error('formatTimeRange: missing formatter or invalid stepSize');
  }

  const startFmt = formatter(start);
  const endFmt = formatter(end);

  return `${startFmt} - ${endFmt}`;
}

/**
 * Format bucket range.
 *
 * @param {object} props
 * @param {Date} props.date
 * @param {GroupDateTypes} props.stepSize
 * @param {number=} props.stepMultiplier
 * @returns string, formatted bucket range
 */
export function formatBucketRange({ date, stepSize, stepMultiplier }) {
  const formatter = fullTimeFormatters[stepSize];
  if (!formatter) {
    throw new Error('formatBucketRange: missing formatter or invalid stepSize');
  }

  const { start, end } = getBucketInterval({ date, stepSize, stepMultiplier });

  if (
    stepMultiplier === 1 &&
    stepSize &&
    SHORTENED_RANGES_WHEN_NO_MULTIPLIES.includes(stepSize)
  ) {
    return formatTime({ date: start, stepSize });
  }

  return formatTimeRange({ start, end, stepSize });
}

const secondstoMs = (s) => 1000 * s;
const minutesToMs = (m) => secondstoMs(60 * m);
const hoursToMs = (h) => minutesToMs(60 * h);

function formatLocalDate(date) {
  return date.toLocaleDateString();
}

function formatDateAndTimeWithMinutes(date) {
  return (
    formatLocalDate(date) +
    ' ' +
    date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  );
}

function formatTimeWithSeconds(date) {
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    second: '2-digit'
  });
}

function formatDateAndTimeWithSeconds(date) {
  return formatLocalDate(date) + ' ' + formatTimeWithSeconds(date);
}

export function getBucketInterval({ date, stepSize, stepMultiplier = 1 }) {
  const intervalCalculator = intervalCalculators[stepSize];
  if (!intervalCalculator) {
    throw new Error('getBucketInterval: invalid bucket size');
  }

  return intervalCalculator({ date, stepMultiplier });
}
//
// bucket interval calculations
//
function getBucketIntervalSeconds({ date, stepMultiplier = 1 }) {
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
  return { start, end };
}

function getBucketIntervalMinutes({ date, stepMultiplier = 1 }) {
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
  return { start, end };
}

function getBucketIntervalHours({ date, stepMultiplier = 1 }) {
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
  return { start, end };
}

function getBucketIntervalDays({ date, stepMultiplier = 1 }) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const end = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + stepMultiplier - 1
  );
  return { start, end };
}

function getBucketIntervalWeeks({ date, stepMultiplier = 1 }) {
  const start = new Date(getMonday(date));
  const end = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + 6 + 7 * (stepMultiplier - 1)
  );
  return { start, end };
}

function getBucketIntervalMonths({ date, stepMultiplier = 1 }) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + stepMultiplier, 0);
  return { start, end };
}

function getBucketIntervalYears({ date, stepMultiplier = 1 }) {
  const start = new Date(date.getFullYear(), 0, 1);
  const end = new Date(date.getFullYear() + (stepMultiplier - 1), 11, 31);
  return { start, end };
}
