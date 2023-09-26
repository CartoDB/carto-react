import React from 'react';
import { render, screen, act, fireEvent, waitFor } from '../widgets/utils/testUtils';
import TimeSeriesWidgetUI, {
  daysCurrentDateRange,
  hoursCurrentDateRange,
  minutesCurrentDateRange,
  monthsCurrentDateRange,
  secondsCurrentDateRange,
  weeksCurrentDateRange,
  yearCurrentDateRange
} from '../../src/widgets/TimeSeriesWidgetUI/TimeSeriesWidgetUI';
import { mockEcharts } from './testUtils';
import { GroupDateTypes } from '@carto/react-core';

describe('TimeSeriesWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
    jest.useFakeTimers();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const DATA = [
    { name: 1514761200000, value: 310 },
    { name: 1515366000000, value: 406 },
    { name: 1515970800000, value: 387 },
    { name: 1516575600000, value: 471 },
    { name: 1517180400000, value: 394 },
    { name: 1517785200000, value: 324 },
    { name: 1518390000000, value: 374 },
    { name: 1518994800000, value: 285 },
    { name: 1519599600000, value: 424 },
    { name: 1520204400000, value: 368 },
    { name: 1520809200000, value: 353 },
    { name: 1521414000000, value: 365 },
    { name: 1522015200000, value: 340 },
    { name: 1522620000000, value: 353 },
    { name: 1523224800000, value: 354 },
    { name: 1523829600000, value: 344 },
    { name: 1524434400000, value: 390 },
    { name: 1525039200000, value: 390 },
    { name: 1525644000000, value: 424 },
    { name: 1526248800000, value: 374 },
    { name: 1526853600000, value: 370 },
    { name: 1527458400000, value: 363 },
    { name: 1528063200000, value: 468 },
    { name: 1528668000000, value: 339 },
    { name: 1529272800000, value: 338 }
  ];

  const mandatoryProps = {
    stepSize: GroupDateTypes.WEEKS
  };

  const Widget = (props) => (
    <TimeSeriesWidgetUI data={DATA} {...props} {...mandatoryProps} />
  );

  test('renders correctly', () => {
    render(<Widget />);
    expect(screen.queryByTestId('clock')).toBeInTheDocument();
  });

  test('renders correctly without controls', () => {
    render(<Widget showControls={false} />);
    expect(screen.queryByTestId('clock')).not.toBeInTheDocument();
  });

  test('renders with initial isPlaying as true', () => {
    const onTimelineUpdate = jest.fn();

    render(<Widget isPlaying={true} onTimelineUpdate={onTimelineUpdate} />);
    expect(screen.queryByTestId('pause-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('stop')).toBeInTheDocument();
    expect(screen.queryByTestId('play-icon')).not.toBeInTheDocument();
    expect(onTimelineUpdate).toBeCalled();
  });

  test('renders with paused animation', () => {
    const onTimelineUpdate = jest.fn();

    render(
      <Widget isPlaying={false} isPaused={true} onTimelineUpdate={onTimelineUpdate} />
    );
    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('stop')).toBeInTheDocument();
    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
    expect(onTimelineUpdate).toBeCalled();
  });

  test('renders with initial timeline position', () => {
    const onTimelineUpdate = jest.fn();

    render(
      <Widget
        isPlaying={false}
        isPaused={true}
        timelinePosition={2}
        onTimelineUpdate={onTimelineUpdate}
      />
    );
    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('stop')).toBeInTheDocument();
    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
    expect(onTimelineUpdate).toHaveBeenCalledWith(2);
  });

  test('plays when play button is fired', () => {
    const onPlay = jest.fn();

    render(<Widget onPlay={onPlay} />);

    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();

    fireEvent.click(screen.queryByTestId('play-pause'));

    expect(screen.queryByTestId('pause-icon')).toBeInTheDocument();
    expect(onPlay).toBeCalled();
  });

  test('pauses when pause button is fired', () => {
    const onPause = jest.fn();

    render(<Widget onPause={onPause} />);

    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();

    fireEvent.click(screen.queryByTestId('play-pause'));

    expect(screen.queryByTestId('pause-icon')).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId('play-pause'));

    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    expect(onPause).toBeCalled();
  });

  test('updates data cause reset component', () => {
    const NEW_DATA = [
      { name: 1514761200000, value: 310 },
      { name: 1515366000000, value: 406 },
      { name: 1515970800000, value: 387 },
      { name: 1516575600000, value: 471 }
    ];

    const onTimelineUpdate = jest.fn();
    const onStop = jest.fn();

    const { rerender } = render(
      <Widget
        isPlaying={false}
        isPaused={true}
        onStop={onStop}
        onTimelineUpdate={onTimelineUpdate}
      />
    );

    rerender(
      <Widget
        data={NEW_DATA}
        isPlaying={false}
        isPaused={true}
        onStop={onStop}
        onTimelineUpdate={onTimelineUpdate}
      />
    );

    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('stop')).toBeInTheDocument();
    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
    expect(onTimelineUpdate).toHaveBeenCalledWith(0);
    // Wait a second, because onStop is called with a certain delay
    setTimeout(() => expect(onStop).toBeCalled());
    jest.runOnlyPendingTimers();
  });

  test('updates internal state from outside correctly', () => {
    const { rerender } = render(<Widget isPlaying={true} isPaused={false} />);
    expect(screen.queryByTestId('pause-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('stop')).toBeInTheDocument();
    expect(screen.queryByTestId('play-icon')).not.toBeInTheDocument();

    rerender(<Widget isPlaying={false} isPaused={true} />);

    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('stop')).toBeInTheDocument();
    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();

    rerender(<Widget isPlaying={false} isPaused={false} />);

    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('stop')).toBeDisabled();
    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
  });

  test('calls onTimelineUpdate when animation starts', () => {
    const onTimelineUpdate = jest.fn();

    act(() => {
      render(
        <Widget isPlaying={true} isPaused={false} onTimelineUpdate={onTimelineUpdate} />
      );

      setTimeout(() => expect(onTimelineUpdate).toHaveBeenCalled());
      jest.runAllTimers();
    });
  });

  test('renders with initial timeWindow position', () => {
    const onTimeWindowUpdate = jest.fn();

    render(
      <Widget
        timeWindow={[1517785200000, 1528063200000]}
        onTimeWindowUpdate={onTimeWindowUpdate}
      />
    );

    expect(onTimeWindowUpdate).toBeCalled();
  });

  test('calls onTimeWindowUpdate when animation starts', () => {
    const onTimeWindowUpdate = jest.fn();
    const onStop = jest.fn();

    act(() => {
      render(
        <Widget
          isPlaying={true}
          isPaused={false}
          timeWindow={[1517785200000, 1528063200000]}
          onTimeWindowUpdate={onTimeWindowUpdate}
          onStop={onStop}
        />
      );

      setTimeout(() => expect(onTimeWindowUpdate).toHaveBeenCalled(), 250);
      jest.runAllTimers();
    });
  });

  test('clear when animation is working', async () => {
    const onStop = jest.fn();
    render(<Widget isPlaying={true} onStop={onStop} />);
    fireEvent.click(screen.getByText(/Clear/));
    await waitFor(async () => expect(onStop).toHaveBeenCalledTimes(1));
  });

  test('clear when set a time window', async () => {
    const onStop = jest.fn();
    render(<Widget timeWindow={[1517785200000, 1528063200000]} onStop={onStop} />);
    fireEvent.click(screen.getByText(/Clear/));
    await waitFor(async () => expect(onStop).toHaveBeenCalledTimes(1));
  });

  describe.only('defaultTooltipFormatter', () => {
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
      expect(daysCurrentDateRange(new Date('2022-03-10'), 2)).toBe(
        '3/10/2022 - 3/11/2022'
      );
      expect(daysCurrentDateRange(new Date('2022-12-01'), 31)).toBe(
        '12/1/2022 - 12/31/2022'
      );

      // cross year
      expect(daysCurrentDateRange(new Date('2022-12-01'), 62)).toBe(
        '12/1/2022 - 1/31/2023'
      );

      // february/march normal year
      expect(daysCurrentDateRange(new Date('2015-02-20'), 10)).toBe(
        '2/20/2015 - 3/1/2015'
      );

      // february/march normal step year
      expect(daysCurrentDateRange(new Date('2016-02-20'), 10)).toBe(
        '2/20/2016 - 2/29/2016'
      );
    });
    test('weeksCurrentDateRange', async () => {
      // warning, at least in my test env all those dates a formatted as US dates MM/DD/YYYY

      expect(weeksCurrentDateRange(new Date('2023-09-04'))).toBe('9/4/2023 - 9/10/2023');
      expect(weeksCurrentDateRange(new Date('2023-05-01'))).toBe('5/1/2023 - 5/7/2023');

      expect(weeksCurrentDateRange(new Date('2023-05-01'), 2)).toBe(
        '5/1/2023 - 5/14/2023'
      );

      // cross end of year
      expect(weeksCurrentDateRange(new Date('2014-12-01'), 10)).toBe(
        '12/1/2014 - 2/8/2015'
      );

      // february/march normal year
      expect(weeksCurrentDateRange(new Date('2015-02-23'), 2)).toBe(
        '2/23/2015 - 3/8/2015'
      );

      // february/march normal step year
      expect(weeksCurrentDateRange(new Date('2016-02-22'), 2)).toBe(
        '2/22/2016 - 3/6/2016'
      );
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
      expect(yearCurrentDateRange(new Date('2023-05-01'), 2)).toBe(
        '1/1/2023 - 12/31/2024'
      );
    });
  });
});
