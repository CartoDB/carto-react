import { GroupDateTypes } from '@carto/react-core';
import { formatBucketRange } from '../../../src/widgets/TimeSeriesWidgetUI/utils/timeFormat';

describe('timeFormat', () => {
  describe('formatBucketRange', () => {
    describe('buckets from date', () => {
      function defineCases(cases) {
        cases.forEach(({ date, expected, title, ...params }) =>
          it(`${date} / ${params.stepMultiplier ?? 1} ${
            params.stepSize
          } ===> ${expected} ${title ? `- ${title}` : ''}`, () =>
            expect(formatBucketRange({ date: new Date(date), ...params })).toBe(expected))
        );
      }
      describe('second', () => {
        defineCases([
          {
            title: 'one second',
            stepMultiplier: 1,
            date: '2022-09-13T13:00:00',
            stepSize: GroupDateTypes.SECONDS,
            expected: '9/13/2022 01:00:00 PM'
          },
          {
            title: 'two seconds',
            date: '2022-09-13T13:00:00',
            stepSize: GroupDateTypes.SECONDS,
            stepMultiplier: 2,
            expected: '9/13/2022 01:00:00 PM - 9/13/2022 01:00:01 PM'
          },
          {
            title: 'full minute',
            date: '2022-03-10T15:00:00',
            stepSize: GroupDateTypes.SECONDS,
            stepMultiplier: 60,
            expected: '3/10/2022 03:00:00 PM - 3/10/2022 03:00:59 PM'
          },
          {
            title: 'cross minute',
            date: '2022-03-10T15:00:00',
            stepSize: GroupDateTypes.SECONDS,
            stepMultiplier: 90,
            expected: '3/10/2022 03:00:00 PM - 3/10/2022 03:01:29 PM'
          }
        ]);
      });
      describe('minute ', () => {
        defineCases([
          {
            title: 'one minute',
            stepMultiplier: 1,
            date: '2022-09-13T13:00:00',
            stepSize: GroupDateTypes.MINUTES,
            expected: '9/13/2022 01:00:00 PM - 9/13/2022 01:00:59 PM'
          },
          {
            title: 'two minutes',
            date: '2022-09-13T13:00:00',
            stepSize: GroupDateTypes.MINUTES,
            stepMultiplier: 2,
            expected: '9/13/2022 01:00:00 PM - 9/13/2022 01:01:59 PM'
          },
          {
            title: 'full hour',
            date: '2022-03-10T15:00:00',
            stepSize: GroupDateTypes.MINUTES,
            stepMultiplier: 60,
            expected: '3/10/2022 03:00:00 PM - 3/10/2022 03:59:59 PM'
          },
          {
            title: 'cross hour',
            date: '2022-03-10T15:00:00',
            stepSize: GroupDateTypes.MINUTES,
            stepMultiplier: 90,
            expected: '3/10/2022 03:00:00 PM - 3/10/2022 04:29:59 PM'
          }
        ]);
      });

      describe('hour', () => {
        defineCases([
          {
            title: 'one hour',
            stepMultiplier: 1,
            date: '2022-03-10T13:00:00',
            stepSize: GroupDateTypes.HOURS,
            expected: '3/10/2022 1:00 PM - 3/10/2022 1:59 PM'
          },
          {
            title: 'two hours',
            date: '2022-03-10T13:00:00',
            stepSize: GroupDateTypes.HOURS,
            stepMultiplier: 2,
            expected: '3/10/2022 1:00 PM - 3/10/2022 2:59 PM'
          },
          {
            title: 'full hour',
            date: '2022-03-10T15:00:00',
            stepSize: GroupDateTypes.HOURS,
            stepMultiplier: 24,
            expected: '3/10/2022 3:00 PM - 3/11/2022 2:59 PM'
          }
        ]);
      });
      describe('day', () => {
        defineCases([
          {
            stepMultiplier: 1,
            date: '2022-03-10',
            stepSize: GroupDateTypes.DAYS,
            expected: '3/10/2022'
          },
          {
            date: '2022-03-10',
            stepSize: GroupDateTypes.DAYS,
            stepMultiplier: 2,
            expected: '3/10/2022 - 3/11/2022'
          },
          {
            title: 'cross year',
            date: '2022-12-01',
            stepSize: GroupDateTypes.DAYS,
            stepMultiplier: 62,
            expected: '12/1/2022 - 1/31/2023'
          },
          {
            title: 'february/march normal year',
            date: '2015-02-20',
            stepSize: GroupDateTypes.DAYS,
            stepMultiplier: 10,
            expected: '2/20/2015 - 3/1/2015'
          },
          {
            title: 'february/march normal step year',
            date: '2016-02-20',
            stepSize: GroupDateTypes.DAYS,
            stepMultiplier: 10,
            expected: '2/20/2016 - 2/29/2016'
          }
        ]);
      });
      describe('week', () => {
        defineCases([
          {
            stepMultiplier: 1,
            date: '2023-09-04',
            stepSize: GroupDateTypes.WEEKS,
            expected: '9/4/2023 - 9/10/2023'
          },
          {
            stepMultiplier: 1,
            date: '2023-05-01',
            stepSize: GroupDateTypes.WEEKS,
            expected: '5/1/2023 - 5/7/2023'
          },
          {
            date: '2023-05-01',
            stepSize: GroupDateTypes.WEEKS,
            stepMultiplier: 2,
            expected: '5/1/2023 - 5/14/2023'
          },
          {
            title: 'cross year',
            date: '2014-12-01',
            stepSize: GroupDateTypes.WEEKS,
            stepMultiplier: 10,
            expected: '12/1/2014 - 2/8/2015'
          },
          {
            title: 'february/march normal year',
            date: '2015-02-23',
            stepSize: GroupDateTypes.WEEKS,
            stepMultiplier: 2,
            expected: '2/23/2015 - 3/8/2015'
          },
          {
            title: 'february/march normal step year',
            date: '2016-02-22',
            stepSize: GroupDateTypes.WEEKS,
            stepMultiplier: 2,
            expected: '2/22/2016 - 3/6/2016'
          }
        ]);
      });
      describe('month', () => {
        defineCases([
          {
            stepMultiplier: 1,
            date: '2023-05-01',
            stepSize: GroupDateTypes.MONTHS,
            expected: '5/1/2023 - 5/31/2023'
          },
          {
            date: '2023-05-01',
            stepSize: GroupDateTypes.MONTHS,
            stepMultiplier: 2,
            expected: '5/1/2023 - 6/30/2023'
          },
          {
            title: 'cross year',
            date: '2014-12-01',
            stepSize: GroupDateTypes.MONTHS,
            stepMultiplier: 10,
            expected: '12/1/2014 - 9/30/2015'
          },
          {
            title: 'february/march normal year',
            date: '2015-02-23',
            stepSize: GroupDateTypes.MONTHS,
            stepMultiplier: 1,
            expected: '2/1/2015 - 2/28/2015'
          },
          {
            title: 'february/march normal step year',
            date: '2016-02-22',
            stepSize: GroupDateTypes.MONTHS,
            stepMultiplier: 1,
            expected: '2/1/2016 - 2/29/2016'
          }
        ]);
      });
      describe('year', () => {
        defineCases([
          {
            stepMultiplier: 1,
            date: '2023-05-01',
            stepSize: GroupDateTypes.YEARS,
            expected: '1/1/2023 - 12/31/2023'
          },
          {
            date: '2023-05-01',
            stepSize: GroupDateTypes.YEARS,
            stepMultiplier: 2,
            expected: '1/1/2023 - 12/31/2024'
          }
        ]);
      });
    });
  });
});
