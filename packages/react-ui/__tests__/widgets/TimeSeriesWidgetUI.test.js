import React from 'react';
import { render, screen, act, fireEvent, waitFor } from '../widgets/utils/testUtils';
import TimeSeriesWidgetUI from '../../src/widgets/TimeSeriesWidgetUI/TimeSeriesWidgetUI';
import { getMaterialUIContext, mockEcharts } from './testUtils';
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

  const Widget = (props) =>
    getMaterialUIContext(
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
});
