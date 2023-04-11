import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Tooltip, styled } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { getPalette } from '../../utils/palette';
import PropTypes from 'prop-types';
import Typography from '../../components/atoms/Typography';

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

const getCircleStyles = ({ isMax, theme }) => ({
  border: '2px solid transparent',
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
});

const getIconStyles = () => ({
  maskRepeat: 'no-repeat',
  maskSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
});

const Marker = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMax' && prop !== 'icon'
})(({ isMax, icon, theme }) => ({
  whiteSpace: 'nowrap',
  display: 'block',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  position: 'relative',
  border: '2px solid transparent',
  ...(icon ? getCircleStyles({ isMax, theme }) : getIconStyles())
}));

const LongTruncate = styled(Typography)(() => ({
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const TitlePhantom = styled(LongTruncate)(() => ({
  opacity: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  pointerEvents: 'none'
}));

function Row({ label, isMax, isStrokeColor, color = '#000', icon, maskedIcon }) {
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
    <Tooltip title={showTooltip ? label : ''} placement='left'>
      <Grid container item alignContent={'center'}>
        <Tooltip title={isMax ? 'Most representative' : ''}>
          <Marker
            mr={1.5}
            component='span'
            isMax={isMax}
            icon={icon}
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
        <LongTruncate ref={labelRef} variant='overlineDelicate'>
          {label}
        </LongTruncate>
        <TitlePhantom ref={labelPhantomRef} variant='overlineDelicate'>
          {label}
        </TitlePhantom>
      </Grid>
    </Tooltip>
  );
}
