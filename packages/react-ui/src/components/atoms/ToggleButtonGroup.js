import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup as MuiToggleButtonGroup, styled } from '@mui/material';

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => !['variant', 'backgroundColor'].includes(prop)
})(({ variant, backgroundColor, theme }) => ({
  // Variants
  ...(variant === 'contained' && {
    boxShadow: 'none'
  }),
  ...(variant === 'unbounded' && {
    boxShadow: 'none',

    '& .MuiDivider-root': {
      height: theme.spacing(4),

      '&.MuiToggleButtonGroup-groupedHorizontal': {
        height: theme.spacing(4)
      },
      '&.MuiToggleButtonGroup-groupedVertical': {
        width: theme.spacing(4),
        height: 'auto',
        margin: `${theme.spacing(0.5, 0, 1)} !important`,
        borderRadius: '0 !important'
      }
    },

    '& .MuiToggleButton-sizeSmall': {
      margin: 0,

      '& + .MuiDivider-root.MuiToggleButtonGroup-groupedHorizontal': {
        height: theme.spacing(3)
      },
      '& + .MuiDivider-root.MuiToggleButtonGroup-groupedVertical': {
        width: theme.spacing(3)
      }
    },

    '.MuiToggleButtonGroup-grouped:not(.MuiDivider-root)': {
      margin: 0,

      '&:first-of-type': {
        marginLeft: 0,
        borderRadius: theme.spacing(1, 0.5, 0.5, 1)
      },
      '&:not(:last-of-type)': {
        marginRight: theme.spacing(0.5)
      },
      '&:last-of-type': {
        borderRadius: theme.spacing(0.5, 1, 1, 0.5)
      }
    },
    '&.MuiToggleButtonGroup-horizontal:not(.MuiDivider-root)': {
      '.MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0, 0.5)
      }
    },
    '&.MuiToggleButtonGroup-vertical:not(.MuiDivider-root)': {
      '.MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0, 0, 0.5),

        '&:first-of-type': {
          borderRadius: theme.spacing(1, 1, 0.5, 0.5)
        },
        '&:not(:last-of-type)': {
          marginRight: 0
        },
        '&:last-of-type': {
          marginBottom: 0,
          borderRadius: theme.spacing(0.5, 0.5, 1, 1)
        }
      }
    }
  }),

  // Colors
  ...(backgroundColor === 'primary' && {
    backgroundColor: theme.palette.background.paper
  }),
  ...(backgroundColor === 'secondary' && {
    backgroundColor: theme.palette.background.default
  }),
  ...(backgroundColor === 'transparent' && {
    backgroundColor: 'transparent'
  })
}));

const ToggleButtonGroup = ({ children, variant, backgroundColor, ...rest }) => {
  const isUnbounded = variant === 'unbounded';
  const defaultColor = isUnbounded ? 'transparent' : 'primary';

  return (
    <StyledToggleButtonGroup
      {...rest}
      variant={variant}
      backgroundColor={backgroundColor || defaultColor}
    >
      {children}
    </StyledToggleButtonGroup>
  );
};

ToggleButtonGroup.defaultProps = {
  variant: 'floating'
};

ToggleButtonGroup.propTypes = {
  variant: PropTypes.oneOf(['floating', 'contained', 'unbounded']),
  backgroundColor: PropTypes.oneOf(['primary', 'secondary', 'transparent'])
};

export default ToggleButtonGroup;
