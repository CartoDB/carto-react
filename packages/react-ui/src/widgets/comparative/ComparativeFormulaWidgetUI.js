import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import AnimatedNumber, {
  animationOptionsPropTypes
} from '../../custom-components/AnimatedNumber';

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];

const useStyles = makeStyles((theme) => ({
  formulaGroup: {
    '& + $formulaGroup': {
      marginTop: theme.spacing(2)
    }
  },
  firstLine: {
    margin: 0,
    ...theme.typography.h5,
    fontWeight: Number(theme.typography.fontWeightMedium),
    color: theme.palette.text.primary,
    display: 'flex'
  },
  unit: {
    marginLeft: theme.spacing(0.5)
  },
  unitBefore: {
    marginLeft: 0,
    marginRight: theme.spacing(0.5)
  },
  note: {
    display: 'inline-block',
    marginTop: theme.spacing(0.5)
  }
}));

/**
 * Renders a `<ComparativeFormulaWidgetUI />` widget
 * <!--
 * @param {Object} props
 * @param {{ prefix?: string; suffix?: string; label?: string, value: number }[]} [props.data]
 * @param {string[]} [props.colors]
 * @param {boolean} [props.animated]
 * @param {{ duration?: number; animateOnMount?: boolean; initialValue?: number; }} [props.animationOptions]
 * @param {(v: number) => React.ReactNode} [props.formatter]
 * -->
 */
function ComparativeFormulaWidgetUI({
  data = EMPTY_ARRAY,
  colors = EMPTY_ARRAY,
  animated = true,
  animationOptions,
  formatter = IDENTITY_FN
}) {
  const theme = useTheme();
  const classes = useStyles();

  const processedData = useMemo(
    () =>
      data
        .map((d, i) => ({
          ...d,
          color: getColor(colors, i)
        }))
        .filter((d) => d.value !== undefined),
    [data, colors]
  );

  const isReference = processedData.length > 1;

  return (
    <div>
      {processedData.map((d, i) => (
        <div className={classes.formulaGroup} key={i}>
          <div className={classes.firstLine}>
            {d.prefix ? (
              <Box color={theme.palette.text.secondary}>
                <Typography
                  color='inherit'
                  component='span'
                  variant='subtitle2'
                  className={[classes.unit, classes.unitBefore].join(' ')}
                >
                  {d.prefix}
                </Typography>
              </Box>
            ) : null}
            <Box fontWeight={isReference && !i ? 'bold' : ''}>
              <AnimatedNumber
                value={d.value || 0}
                enabled={animated}
                options={animationOptions}
                formatter={formatter}
              />
            </Box>
            {d.suffix ? (
              <Box color={theme.palette.text.secondary}>
                <Typography
                  color='inherit'
                  component='span'
                  variant='subtitle2'
                  className={classes.unit}
                >
                  {d.suffix}
                </Typography>
              </Box>
            ) : null}
          </div>
          {d.label ? (
            <Box color={d.color || theme.palette.text.secondary}>
              <Typography className={classes.note} color='inherit' variant='caption'>
                {d.label}
              </Typography>
            </Box>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function getColor(colors, index) {
  return colors[index];
}

ComparativeFormulaWidgetUI.displayName = 'ComparativeFormulaWidgetUI';
ComparativeFormulaWidgetUI.defaultProps = {
  data: EMPTY_ARRAY,
  colors: EMPTY_ARRAY,
  animated: true,
  animationOptions: {},
  formatter: IDENTITY_FN
};

const formulaDataPropTypes = PropTypes.shape({
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  note: PropTypes.string,
  value: PropTypes.number
});

ComparativeFormulaWidgetUI.propTypes = {
  data: PropTypes.arrayOf(formulaDataPropTypes).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  animated: PropTypes.bool,
  animationOptions: animationOptionsPropTypes,
  formatter: PropTypes.func
};

export default ComparativeFormulaWidgetUI;
