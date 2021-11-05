import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { getDate, getTimestamp } from '../utils/utilities';

export const TimeSeriesContext = createContext({
  isPlaying: false,
  setIsPlaying: (value) => {},
  onPlay: () => {},
  isPaused: false,
  setIsPaused: (value) => {},
  onPause: () => {},
  onStop: () => {},
  timelinePosition: 0,
  setTimelinePosition: (value) => {},
  onTimelineUpdate: (value) => {},
  timeWindow: [],
  setTimeWindow: (value) => {},
  onTimeWindowUpdate: (value) => {},
  togglePlay: () => {},
  stop: () => {}
});

export function useTimeSeriesContext() {
  return useContext(TimeSeriesContext);
}

export function TimeSeriesProvider({
  children,
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
  timelinePosition,
  onTimelineUpdate,
  timeWindow,
  onTimeWindowUpdate
}) {
  const [_isPlaying, setIsPlaying] = useState(isPlaying);
  const [_isPaused, setIsPaused] = useState(isPaused);
  const [_timelinePosition, setTimelinePosition] = useState(0);
  const [_timeWindow, setTimeWindow] = useState([]);

  useEffect(() => {
    if (_timeWindow.length === 2 && onTimeWindowUpdate) {
      onTimeWindowUpdate(_timeWindow.sort().map(getDate));
    }
    // Only executed when timeWindow changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_timeWindow]);

  useEffect(() => {
    if (!_timeWindow.length && (_isPlaying || _isPaused) && onTimelineUpdate) {
      onTimelineUpdate(_timelinePosition);
    }
    // Only executed when timelinePosition changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_timelinePosition, _isPlaying, _isPaused, _timeWindow]);

  const togglePlay = useCallback(() => {
    if (_isPlaying) {
      if (onPause) onPause();
      setIsPaused(true);
    }
    if (!_isPlaying) {
      if (onPlay) onPlay();
      setIsPaused(false);
    }
    setIsPlaying((oldState) => !oldState);
  }, [_isPlaying, onPause, onPlay]);

  const stopWrapper = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setTimelinePosition(0);
    setTimeWindow([]);
  }, []);

  const stop = useCallback(() => {
    stopWrapper();
    // Wait a clock cycle to avoid condition race
    // meanwhile the states is setted above
    setTimeout(onStop || (() => {}));
  }, [onStop, stopWrapper]);

  // These four useEffects are used to allow
  // manage time series state outside the widget
  useEffect(() => {
    if (isPlaying !== _isPlaying) {
      setIsPlaying(isPlaying);
    }
    // Only when the state out of the context changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (isPaused !== _isPaused) {
      setIsPaused(isPaused);
    }
    // Only when the state out of the context changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  useEffect(() => {
    if (timelinePosition !== _timelinePosition) {
      setTimelinePosition(timelinePosition);
    }
    // Only when the state out of the context changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelinePosition]);

  useEffect(() => {
    const timeWindowTimestamp = timeWindow.map(getTimestamp);
    const _timeWindowTimestamp = _timeWindow.map(getTimestamp);
    if (
      timeWindowTimestamp[0] !== _timeWindowTimestamp[0] &&
      timeWindowTimestamp[1] !== _timeWindowTimestamp[1]
    ) {
      setTimeWindow(timeWindowTimestamp);
    }
    // Only when the state out of the context changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...timeWindow]);

  return (
    <TimeSeriesContext.Provider
      value={{
        isPlaying: _isPlaying,
        setIsPlaying,
        isPaused: _isPaused,
        setIsPaused,
        timelinePosition: _timelinePosition,
        setTimelinePosition,
        onTimelineUpdate,
        timeWindow: _timeWindow,
        setTimeWindow,
        onTimeWindowUpdate,
        togglePlay,
        stop
      }}
    >
      {children}
    </TimeSeriesContext.Provider>
  );
}
