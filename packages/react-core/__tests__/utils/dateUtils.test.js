import { getMonday, getUTCMonday } from '../../src/utils/dateUtils';

const TEST_CASES = [
  {
    title: 'monday',
    date: [2023, 9, 4],
    expected: [2023, 9, 4]
  },
  {
    title: 'monday, cross year',
    date: [2014, 12, 1],
    expected: [2014, 12, 1]
  },
  {
    title: 'monday, february/march normal year',
    date: [2015, 2, 23],
    expected: [2015, 2, 23]
  },
  {
    title: 'monday, february/march step year',
    date: [2016, 2, 22],
    expected: [2016, 2, 22]
  },
  {
    title: 'sunday, cross year',
    date: [2023, 1, 1],
    expected: [2022, 12, 26]
  },
  {
    title: 'saturday, february/march step year',
    date: [2024, 3, 2],
    expected: [2024, 2, 26]
  }
];

/** Returns midnight (local time) for given year/month/date. */
function createDate([year, month, date]) {
  return new Date(year, month - 1, date);
}

/** Returns midnight (UTC) for given year/month/date. */
function createUTCDate([year, month, date]) {
  return new Date(Date.UTC(year, month - 1, date));
}

describe('getMonday', () => {
  for (const { date, expected, title } of TEST_CASES) {
    const expectedString = createDate(expected).toLocaleString();
    it(`${date} ===> ${expectedString} - ${title}`, () => {
      const local = getMonday(createDate(date));
      const localString = new Date(local).toLocaleString();
      expect(localString).toBe(expectedString);
    });
  }
});

describe('getUTCMonday', () => {
  for (const { date, expected, title } of TEST_CASES) {
    const expectedString = createUTCDate(expected).toISOString();
    it(`${date} ===> ${expectedString} - ${title}`, () => {
      const utc = getUTCMonday(createUTCDate(date));
      const utcString = new Date(utc).toISOString();
      expect(utcString).toBe(expectedString);
    });
  }
});
