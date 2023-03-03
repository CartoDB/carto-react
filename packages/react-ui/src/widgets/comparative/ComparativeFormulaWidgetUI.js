import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnimatedNumber, {
  animationOptionsPropTypes
} from '../../custom-components/AnimatedNumber';
import Typography from '../../components/atoms/Typography';

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];

const FormulaGroup = styled('div')(({ theme }) => ({
  '&:nth-of-type(n+2)': {
    marginTop: theme.spacing(2)
  }
}));

const FirstLine = styled('div')(({ theme }) => ({
  margin: 0,
  ...theme.typography.h5,
  fontWeight: Number(theme.typography.fontWeightMedium),
  color: theme.palette.text.primary,
  display: 'flex'
}));

const Preffix = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5)
}));

const Unit = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(0.5)
}));

const Note = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  marginTop: theme.spacing(0.5)
}));

/**
 * Renders a `<ComparativeFormulaWidgetUI />` widget
 * <!--
 * @param {Object} props
 * @param {{ prefix?: React.ReactNode; suffix?: React.ReactNode; label?: React.ReactNode, value: number }[]} [props.data]
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
        <FormulaGroup key={i}>
          <FirstLine>
            {d.prefix ? (
              <Box color={theme.palette.text.secondary}>
                <Preffix color='inherit' component='span' variant='subtitle2'>
                  {d.prefix}
                </Preffix>
              </Box>
            ) : null}
            <Box fontWeight={isReference && !i ? 'bold' : ''}>
              <AnimatedNumber
                value={d.value}
                enabled={animated}
                options={animationOptions}
                formatter={formatter}
              />
            </Box>
            {d.suffix ? (
              <Box color={theme.palette.text.secondary}>
                <Unit color='inherit' component='span' variant='subtitle2'>
                  {d.suffix}
                </Unit>
              </Box>
            ) : null}
          </FirstLine>
          {d.label ? (
            <Box color={d.color || theme.palette.text.secondary}>
              <Note color='inherit' variant='caption'>
                {d.label}
              </Note>
            </Box>
          ) : null}
        </FormulaGroup>
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
