import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

export const TimeSeriesContext = createContext({
  animationStep: 0,
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
  timeframe: [],
  setTimeframe: (value) => {},
  onTimeframeUpdate: (value) => {},
  togglePlay: () => {},
  stop: () => {}
});

export function useTimeSeriesContext() {
  return useContext(TimeSeriesContext);
}

export function TimeSeriesProvider({
  children,
  animationStep,
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
  timelinePosition,
  onTimelineUpdate,
  timeframe,
  onTimeframeUpdate
}) {
  const [_isPlaying, setIsPlaying] = useState(isPlaying);
  const [_isPaused, setIsPaused] = useState(isPaused);
  const [_timelinePosition, setTimelinePosition] = useState(0);
  const [_timeframe, setTimeframe] = useState([]);

  useEffect(() => {
    if (_timeframe.length === 2) {
      onTimeframeUpdate(_timeframe.sort());
    }
    // Only executed when timeframe changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_timeframe]);

  useEffect(() => {
    if (_isPlaying || _isPaused) {
      onTimelineUpdate(_timelinePosition);
    }
    // Only executed when timelinePosition changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_timelinePosition, _isPlaying, _isPaused]);

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

  const stopWrapper = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setTimelinePosition(0);
    setTimeframe([]);
  };

  const stop = useCallback(() => {
    stopWrapper();
    // Wait a clock cycle to avoid condition race
    // meanwhile the states is setted above
    setTimeout(onStop || (() => {}));
  }, [onStop]);

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
    if (timeframe[0] !== _timeframe[0] && timeframe[1] !== _timeframe[1]) {
      setTimeframe(timeframe);
    }
    // Only when the state out of the context changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...timeframe]);

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
        timeframe: _timeframe,
        setTimeframe,
        onTimeframeUpdate,
        togglePlay,
        stop,
        animationStep
      }}
    >
      {children}
    </TimeSeriesContext.Provider>
  );
}
