import React from 'react';
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
 * @param {number[]} props.data
 * @param {{ prefix?: string; suffix?: string; note?: string }[]} [props.labels]
 * @param {{ prefix?: string; suffix?: string; note?: string; value?: string }[]} [props.colors]
 * @param {boolean} [props.animated]
 * @param {{ duration?: number; animateOnMount?: boolean; initialValue?: number; }} [props.animationOptions]
 * @param {(v: number) => React.ReactNode} [props.formatter]
 * -->
 */
function ComparativeFormulaWidgetUI({
  data = EMPTY_ARRAY,
  labels = EMPTY_ARRAY,
  colors = EMPTY_ARRAY,
  animated = true,
  animationOptions,
  formatter = IDENTITY_FN
}) {
  const theme = useTheme();
  const classes = useStyles();

  function getColor(index) {
    return colors[index] || {};
  }
  function getLabel(index) {
    return labels[index] || {};
  }

  return (
    <div>
      {data
        .filter((n) => n !== undefined)
        .map((d, i) => (
          <div className={classes.formulaGroup} key={i}>
            <div className={classes.firstLine}>
              {getLabel(i).prefix ? (
                <Box color={getColor(i).prefix || theme.palette.text.secondary}>
                  <Typography
                    color='inherit'
                    component='span'
                    variant='subtitle2'
                    className={[classes.unit, classes.unitBefore].join(' ')}
                  >
                    {getLabel(i).prefix}
                  </Typography>
                </Box>
              ) : null}
              <Box color={getColor(i).value}>
                <AnimatedNumber
                  value={d}
                  enabled={animated}
                  options={animationOptions}
                  formatter={formatter}
                />
              </Box>
              {getLabel(i).suffix ? (
                <Box color={getColor(i).suffix || theme.palette.text.secondary}>
                  <Typography
                    color='inherit'
                    component='span'
                    variant='subtitle2'
                    className={classes.unit}
                  >
                    {getLabel(i).suffix}
                  </Typography>
                </Box>
              ) : null}
            </div>
            {getLabel(i).note ? (
              <Box color={getColor(i).note}>
                <Typography className={classes.note} color='inherit' variant='caption'>
                  {getLabel(i).note}
                </Typography>
              </Box>
            ) : null}
          </div>
        ))}
    </div>
  );
}

ComparativeFormulaWidgetUI.displayName = 'ComparativeFormulaWidgetUI';
ComparativeFormulaWidgetUI.defaultProps = {
  data: EMPTY_ARRAY,
  labels: EMPTY_ARRAY,
  colors: EMPTY_ARRAY,
  animated: true,
  animationOptions: {},
  formatter: IDENTITY_FN
};

const formulaLabelsPropTypes = PropTypes.shape({
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  note: PropTypes.string
});

const formulaColorsPropTypes = PropTypes.shape({
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  note: PropTypes.string,
  value: PropTypes.string
});

ComparativeFormulaWidgetUI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(formulaLabelsPropTypes),
  colors: PropTypes.arrayOf(formulaColorsPropTypes),
  animated: PropTypes.bool,
  animationOptions: animationOptionsPropTypes,
  formatter: PropTypes.func
};

export default ComparativeFormulaWidgetUI;
