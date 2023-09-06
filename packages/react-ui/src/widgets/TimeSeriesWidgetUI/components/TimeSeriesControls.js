import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Menu, IconButton, MenuItem, SvgIcon } from '@mui/material';

import { GroupDateTypes } from '@carto/react-core';
import Typography from '../../../components/atoms/Typography';
import { useTimeSeriesContext } from '../hooks/TimeSeriesContext';

// TimeWindow step is the amount of time (in seconds) that pass in every iteration during the animation.
// It depends on step size for a better animation speed adjustment.
const TIME_WINDOW_STEP_BY_STEP_SIZE = {
  [GroupDateTypes.YEARS]: 60 * 60 * 24 * 7, // Week
  [GroupDateTypes.MONTHS]: 60 * 60 * 24, // Day
  [GroupDateTypes.WEEKS]: 60 * 60 * 24, // Day
  [GroupDateTypes.DAYS]: 60 * 60 * 12, // Half day
  [GroupDateTypes.HOURS]: 60 * 60, // Hour
  [GroupDateTypes.MINUTES]: 60 * 15 // Quarter hour
};

const SPEED_FACTORS = [0.5, 1, 2, 3];

export function TimeSeriesControls({ data, stepSize }) {
  const [anchorSpeedEl, setAnchorSpeedEl] = useState(null);
  const [speed, setSpeed] = useState(1);
  const animationRef = useRef({ animationFrameId: null, timeoutId: null });

  const {
    isPlaying,
    isPaused,
    timeWindow,
    timelinePosition,
    setTimelinePosition,
    setTimeWindow,
    stop,
    togglePlay
  } = useTimeSeriesContext();

  // If data changes, stop animation. useDidMountEffect is used to avoid
  // being executed in the initial rendering because that cause
  // resetting (stop) the state settled by the user using props.
  useDidMountEffect(
    () => (isPlaying || isPaused) && stop(),
    // Only executed when data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const stopAnimation = () => {
    const { animationFrameId, timeoutId } = animationRef.current;
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleStop = useCallback(() => {
    stopAnimation();
    stop();
  }, [stop]);

  const handleTogglePlay = () => {
    stopAnimation();
    togglePlay();
  };

  // Running timeWindow
  useEffect(() => {
    if (isPlaying && timeWindow.length === 2 && data.length) {
      const timeWindowStep = TIME_WINDOW_STEP_BY_STEP_SIZE[stepSize];
      const msTimeWindowStep = timeWindowStep * 1000;

      animateTimeWindow({
        data,
        timeWindow,
        msTimeWindowStep: msTimeWindowStep * speed,
        drawFrame: (newTimeWindow) => {
          setTimeWindow(newTimeWindow);
        },
        onEnd: () => {
          // To show the last item, wait a moment
          setTimeout(handleStop, 250);
        },
        animationRef
      });

      return () => stopAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPlaying, stepSize, setTimeWindow, handleStop, speed]);

  // Running timeline
  useEffect(() => {
    if (isPlaying && !timeWindow.length && data.length) {
      animateTimeline({
        speed,
        timelinePosition,
        data,
        drawFrame: (newTimelinePosition) => {
          setTimelinePosition(newTimelinePosition);
        },
        onEnd: () => {
          setTimeout(handleStop, 250);
        },
        animationRef
      });

      return () => stopAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPlaying, speed, timeWindow.length, handleStop, setTimelinePosition]);

  const handleOpenSpeedMenu = (e) => {
    if (e?.currentTarget) {
      setAnchorSpeedEl(e.currentTarget);
    }
  };

  const handleCloseSpeedMenu = () => {
    setAnchorSpeedEl(null);
  };

  const handleSpeedUpdate = (newSpeed) => {
    setSpeed(newSpeed);
    handleCloseSpeedMenu();
  };

  return (
    <>
      <IconButton
        size='small'
        color='default'
        onClick={handleOpenSpeedMenu}
        data-testid='clock'
      >
        <ClockIcon />
      </IconButton>
      <Menu
        anchorEl={anchorSpeedEl}
        keepMounted
        open={Boolean(anchorSpeedEl)}
        onClose={handleCloseSpeedMenu}
      >
        <MenuItem disabled>
          <Typography variant='caption' color='textSecondary'>
            Speed
          </Typography>
        </MenuItem>
        {SPEED_FACTORS.map((speedItem) => (
          <MenuItem
            key={speedItem}
            selected={speedItem === speed}
            onClick={() => handleSpeedUpdate(speedItem)}
          >
            {speedItem}x
          </MenuItem>
        ))}
      </Menu>
      <Box mt={2}>
        <IconButton
          size='small'
          color='primary'
          disabled={!(isPaused || isPlaying)}
          onClick={handleStop}
          data-testid='stop'
        >
          <StopIcon />
        </IconButton>
      </Box>
      <Box mt={0.75}>
        <IconButton
          data-testid='play-pause'
          size='small'
          color='primary'
          onClick={handleTogglePlay}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </Box>
    </>
  );
}

function ClockIcon() {
  return (
    <SvgIcon viewBox='0 0 20 20'>
      <path
        d='M12.5 1.254h-5v1.667h5V1.254zM9.167 12.088h1.666v-5H9.167v5zm6.691-5.517 1.184-1.183a9.207 9.207 0 0 0-1.175-1.175l-1.184 1.183A7.468 7.468 0 0 0 10 3.746a7.5 7.5 0 0 0-7.5 7.5c0 4.141 3.35 7.5 7.5 7.5s7.5-3.358 7.5-7.5a7.504 7.504 0 0 0-1.642-4.675zM10 17.088a5.83 5.83 0 0 1-5.833-5.834A5.83 5.83 0 0 1 10 5.421a5.83 5.83 0 0 1 5.833 5.833A5.83 5.83 0 0 1 10 17.087z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

function PlayIcon() {
  return (
    <SvgIcon data-testid='play-icon'>
      <path
        d='M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

function StopIcon() {
  return (
    <SvgIcon>
      <path
        d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm4 4v8H8V8h8zm-2 2h-4v4h4v-4z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

function PauseIcon() {
  return (
    <SvgIcon data-testid='pause-icon'>
      <path
        d='M9,16 L11,16 L11,8 L9,8 L9,16 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z M13,16 L15,16 L15,8 L13,8 L13,16 Z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

// Special useEffect that only
// works after the first rendering
function useDidMountEffect(func, deps = []) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function animateTimeWindow({
  msTimeWindowStep,
  timeWindow,
  data,
  drawFrame,
  onEnd,
  animationRef
}) {
  let currentTimeWindow = timeWindow;

  const fireAnimation = () => {
    animationRef.current.animationFrameId = window.requestAnimationFrame(animate);
  };

  const animate = () => {
    currentTimeWindow = [
      currentTimeWindow[0] + msTimeWindowStep,
      currentTimeWindow[1] + msTimeWindowStep
    ];
    if (currentTimeWindow[1] > data[data.length - 1].name) {
      onEnd();
    } else {
      drawFrame(currentTimeWindow);
      fireAnimation();
    }
  };

  fireAnimation();
}

const MIN_FPS = 2;

function animateTimeline({
  speed,
  timelinePosition,
  data,
  drawFrame,
  onEnd,
  animationRef
}) {
  let currentTimeline = timelinePosition;

  const fpsToUse =
    Math.max(
      Math.round(Math.sqrt(data.length) / 2), // FPS based on data length
      MIN_FPS // Min FPS
    ) * speed;

  const fireAnimation = () => {
    animationRef.current.timeoutId = setTimeout(() => {
      animationRef.current.animationFrameId = window.requestAnimationFrame(animate);
    }, 1000 / fpsToUse);
  };

  const animate = () => {
    currentTimeline = Math.min(data.length, currentTimeline + 1);
    if (currentTimeline === data.length) {
      onEnd();
    } else {
      drawFrame(currentTimeline);
      fireAnimation();
    }
  };

  fireAnimation();
}
