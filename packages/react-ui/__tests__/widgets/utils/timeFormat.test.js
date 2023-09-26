import {
  daysCurrentDateRange,
  hoursCurrentDateRange,
  minutesCurrentDateRange,
  monthsCurrentDateRange,
  secondsCurrentDateRange,
  weeksCurrentDateRange,
  yearCurrentDateRange
} from '../../../src/widgets/TimeSeriesWidgetUI/utils/timeFormat';

describe('defaultTooltipFormatter', () => {
  test('secondsCurrentDateRange', async () => {
    // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY

    // 13/09/2023 1:00:00 pm - 1:00:00 pm, 4 Second Interval = 13/09/2023 1:00:00 pm - 13/09/2023 1:00:04 pm
    expect(secondsCurrentDateRange(new Date('2022-09-13T13:00:00'))).toBe(
      '9/13/2022 01:00:00 PM - 01:00:00 PM'
    );
    expect(secondsCurrentDateRange(new Date('2022-09-13T13:00:00'), 2)).toBe(
      '9/13/2022 01:00:00 PM - 9/13/2022 01:00:01 PM'
    );

    // full minute
    expect(secondsCurrentDateRange(new Date('2022-03-10T15:00:00'), 60)).toBe(
      '3/10/2022 03:00:00 PM - 3/10/2022 03:00:59 PM'
    );

    // cross minute
    expect(secondsCurrentDateRange(new Date('2022-03-10T15:00:00'), 90)).toBe(
      '3/10/2022 03:00:00 PM - 3/10/2022 03:01:29 PM'
    );
  });

  test('minutesCurrentDateRange', async () => {
    // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY

    // 13/09/2023 1:00:00 pm - 1:00:00 pm, 4 Second Interval = 13/09/2023 1:00:00 pm - 13/09/2023 1:00:04 pm
    expect(minutesCurrentDateRange(new Date('2022-09-13T13:00:00'))).toBe(
      '9/13/2022 01:00:00 PM - 9/13/2022 01:00:59 PM'
    );
    expect(minutesCurrentDateRange(new Date('2022-09-13T13:00:00'), 2)).toBe(
      '9/13/2022 01:00:00 PM - 9/13/2022 01:01:59 PM'
    );

    // full hour
    expect(minutesCurrentDateRange(new Date('2022-03-10T15:00:00'), 60)).toBe(
      '3/10/2022 03:00:00 PM - 3/10/2022 03:59:59 PM'
    );

    // cross hour
    expect(minutesCurrentDateRange(new Date('2022-03-10T15:00:00'), 90)).toBe(
      '3/10/2022 03:00:00 PM - 3/10/2022 04:29:59 PM'
    );
  });

  test('hoursCurrentDateRange', async () => {
    // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY
    expect(hoursCurrentDateRange(new Date('2022-03-10T13:00:00'))).toBe(
      '3/10/2022 1:00 PM - 3/10/2022 1:59 PM'
    );
    expect(hoursCurrentDateRange(new Date('2022-03-10T13:00:00'), 2)).toBe(
      '3/10/2022 1:00 PM - 3/10/2022 2:59 PM'
    );

    // cross day
    expect(hoursCurrentDateRange(new Date('2022-03-10T15:00:00'), 24)).toBe(
      '3/10/2022 3:00 PM - 3/11/2022 2:59 PM'
    );
  });

  test('daysCurrentDateRange', async () => {
    // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY
    expect(daysCurrentDateRange(new Date('2022-03-10'))).toBe('3/10/2022');
    expect(daysCurrentDateRange(new Date('2022-03-10'), 2)).toBe('3/10/2022 - 3/11/2022');
    expect(daysCurrentDateRange(new Date('2022-12-01'), 31)).toBe(
      '12/1/2022 - 12/31/2022'
    );

    // cross year
    expect(daysCurrentDateRange(new Date('2022-12-01'), 62)).toBe(
      '12/1/2022 - 1/31/2023'
    );

    // february/march normal year
    expect(daysCurrentDateRange(new Date('2015-02-20'), 10)).toBe('2/20/2015 - 3/1/2015');

    // february/march normal step year
    expect(daysCurrentDateRange(new Date('2016-02-20'), 10)).toBe(
      '2/20/2016 - 2/29/2016'
    );
  });
  test('weeksCurrentDateRange', async () => {
    // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY

    expect(weeksCurrentDateRange(new Date('2023-09-04'))).toBe('9/4/2023 - 9/10/2023');
    expect(weeksCurrentDateRange(new Date('2023-05-01'))).toBe('5/1/2023 - 5/7/2023');

    expect(weeksCurrentDateRange(new Date('2023-05-01'), 2)).toBe('5/1/2023 - 5/14/2023');

    // cross end of year
    expect(weeksCurrentDateRange(new Date('2014-12-01'), 10)).toBe(
      '12/1/2014 - 2/8/2015'
    );

    // february/march normal year
    expect(weeksCurrentDateRange(new Date('2015-02-23'), 2)).toBe('2/23/2015 - 3/8/2015');

    // february/march normal step year
    expect(weeksCurrentDateRange(new Date('2016-02-22'), 2)).toBe('2/22/2016 - 3/6/2016');
  });

  test('monthsCurrentDateRange', async () => {
    // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY
    expect(monthsCurrentDateRange(new Date('2023-05-01'))).toBe('5/1/2023 - 5/31/2023');
    expect(monthsCurrentDateRange(new Date('2023-05-01'), 2)).toBe(
      '5/1/2023 - 6/30/2023'
    );

    // february normal
    expect(monthsCurrentDateRange(new Date('2015-02-23'), 1)).toBe(
      '2/1/2015 - 2/28/2015'
    );

    // february step
    expect(monthsCurrentDateRange(new Date('2016-02-23'), 1)).toBe(
      '2/1/2016 - 2/29/2016'
    );

    // cross end of year
    expect(monthsCurrentDateRange(new Date('2014-12-01'), 10)).toBe(
      '12/1/2014 - 9/30/2015'
    );
  });

  test('yearCurrentDateRange', async () => {
    // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY
    expect(yearCurrentDateRange(new Date('2023-05-01'))).toBe('1/1/2023 - 12/31/2023');
    expect(yearCurrentDateRange(new Date('2023-05-01'), 2)).toBe('1/1/2023 - 12/31/2024');
  });
});
