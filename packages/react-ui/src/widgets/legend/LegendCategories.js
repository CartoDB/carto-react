import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { getPalette } from '../../utils/palette';
import PropTypes from 'prop-types';

function LegendCategories({ legend }) {
  const {
    labels = [],
    colors = [],
    isStrokeColor = false,
    customMarkers,
    maskedMarkers = true
  } = legend;

  const palette = getPalette(colors, labels.length);

  const Rows = labels.map((label, idx) => (
    <Row
      key={label + idx}
      isMax={false}
      label={label}
      color={palette[idx]}
      icon={
        customMarkers && Array.isArray(customMarkers) ? customMarkers[idx] : customMarkers
      }
      maskedIcon={maskedMarkers}
      isStrokeColor={isStrokeColor}
    />
  ));

  return (
    <Grid container direction='column' spacing={1} data-testid='categories-legend'>
      {Rows}
    </Grid>
  );
}

LegendCategories.defaultProps = {
  legend: {
    labels: [],
    colors: [],
    isStrokeColor: false
  }
};

const ColorType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.number)
]);

LegendCategories.propTypes = {
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    colors: PropTypes.oneOfType([PropTypes.arrayOf(ColorType), PropTypes.string]),
    customMarkers: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    maskedMarkers: PropTypes.bool,
    isStrokeColor: PropTypes.bool
  }).isRequired
};

export default LegendCategories;

// Aux
const useStyles = makeStyles((theme) => ({
  legendCategories: {
    alignItems: 'center'
  },
  marker: {
    whiteSpace: 'nowrap',
    display: 'block',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    position: 'relative'
  },
  circle: {
    '&::after': {
      position: 'absolute',
      display: ({ isMax }) => (isMax ? 'block' : 'none'),
      content: '""',
      width: '16px',
      height: '16px',
      border: `2px solid ${theme.palette.grey[900]}`,
      transform: 'translate(-30%, -30%)',
      borderRadius: '50%',
      boxSizing: 'content-box'
    }
  },
  icon: {
    maskRepeat: 'no-repeat',
    maskSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  flexParent: {
    display: 'flex',
    alignItems: 'center'
  },
  longTruncate: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  titlePhantom: {
    opacity: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    pointerEvents: 'none'
  }
}));

function Row({ label, isMax, isStrokeColor, color = '#000', icon, maskedIcon }) {
  const classes = useStyles({ isMax });

  const [showTooltip, setShowTooltip] = useState(false);
  const labelRef = useRef(null);
  const labelPhantomRef = useRef(null);

  useEffect(() => {
    if (!labelPhantomRef?.current || !labelRef?.current) {
      return;
    }
    const labelSizes = labelRef?.current.getBoundingClientRect();
    const labelPhantomSizes = labelPhantomRef?.current.getBoundingClientRect();
    setShowTooltip(labelPhantomSizes.width > labelSizes.width);
  }, [setShowTooltip, labelPhantomRef, labelRef]);

  return (
    <Tooltip title={showTooltip ? label : ''} placement='left' arrow>
      <Grid
        container
        item
        className={[classes.legendCategories, classes.flexParent].join(' ')}
      >
        <Tooltip title={isMax ? 'Most representative' : ''} placement='top' arrow>
          <Box
            mr={1.5}
            component='span'
            className={[classes.marker, icon ? classes.icon : classes.circle].join(' ')}
            style={
              icon
                ? maskedIcon
                  ? {
                      backgroundColor: color,
                      maskImage: `url(${icon})`,
                      WebkitMaskImage: `url(${icon})`
                    }
                  : {
                      backgroundColor: `rgba(0,0,0,0)`,
                      backgroundImage: `url(${icon})`
                    }
                : isStrokeColor
                ? { borderColor: color }
                : { backgroundColor: color }
            }
          />
        </Tooltip>
        <Typography ref={labelRef} variant='overline' className={classes.longTruncate}>
          {label}
        </Typography>
        <Typography
          ref={labelPhantomRef}
          variant='overline'
          className={[classes.longTruncate, classes.titlePhantom].join(' ')}
        >
          {label}
        </Typography>
      </Grid>
    </Tooltip>
  );
}
