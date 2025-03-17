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
    borderRadius: theme.spacing(0.5),

    '& .MuiDivider-root': {
      height: theme.spacing(4),

      '&.MuiToggleButtonGroup-groupedHorizontal': {
        height: theme.spacing(4)
      },
      '&.MuiToggleButtonGroup-groupedVertical': {
        height: 'auto',
        width: theme.spacing(4),
        margin: `${theme.spacing(0.5, 0, 1)} !important`,
        borderRadius: '0 !important'
      }
    },

    '& .MuiToggleButton-sizeSmall': {
      margin: 0,

      '&.MuiToggleButtonGroup-grouped:not(.MuiDivider-root)': {
        margin: 0
      },
      '& + .MuiDivider-root.MuiToggleButtonGroup-groupedHorizontal': {
        height: theme.spacing(3)
      },
      '& + .MuiDivider-root.MuiToggleButtonGroup-groupedVertical': {
        height: 'auto',
        width: theme.spacing(3)
      }
    },

    '.MuiToggleButtonGroup-grouped:not(.MuiDivider-root)': {
      margin: 0,

      '&:first-of-type': {
        marginLeft: 0
      },
      '&:not(:last-of-type)': {
        marginRight: theme.spacing(0.5)
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

        '&:not(:last-of-type)': {
          marginRight: 0
        },
        '&:last-of-type': {
          marginBottom: 0
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

const ToggleButtonGroup = ({
  children,
  variant = 'floating',
  backgroundColor,
  ...rest
}) => {
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

ToggleButtonGroup.propTypes = {
  variant: PropTypes.oneOf(['floating', 'contained', 'unbounded']),
  backgroundColor: PropTypes.oneOf(['primary', 'secondary', 'transparent'])
};

export default ToggleButtonGroup;
