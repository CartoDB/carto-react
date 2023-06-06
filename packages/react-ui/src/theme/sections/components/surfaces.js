import React from 'react';
import { APPBAR_SIZE } from '../../themeConstants';
import { ExpandMoreOutlined } from '@mui/icons-material';

export const surfacesOverrides = {
  // AppBar
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: APPBAR_SIZE,
        backgroundColor: theme.palette.brand.navyBlue,
        color: theme.palette.common.white,
        boxShadow: theme.shadows[0],

        '& .MuiToolbar-root': {
          justifyContent: 'space-between',
          width: '100%',
          padding: theme.spacing(0, 1),
          minHeight: APPBAR_SIZE
        },
        '& .MuiTypography-root': {
          color: theme.palette.common.white
        },
        '& .MuiIconButton-root path': {
          fill: theme.palette.common.white
        },
        '& .MuiAvatar-root': {
          width: theme.spacing(4),
          height: theme.spacing(4)
        }
      })
    }
  },

  // MuiAccordion
  MuiAccordion: {
    defaultProps: {
      disableGutters: true,
      elevation: 0
    },
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body2,
        backgroundColor: 'transparent',
        boxShadow: `inset 0 -1px 0 0 ${theme.palette.divider}`,

        '&:last-of-type': {
          boxShadow: 'none'
        },
        '&::before': {
          content: 'none'
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent'
        }
      })
    }
  },
  // MuiAccordionSummary
  MuiAccordionSummary: {
    defaultProps: {
      expandIcon: <ExpandMoreOutlined />
    },
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.button,

        '&.Mui-disabled': {
          opacity: 1,
          color: theme.palette.text.disabled
        }
      }),
      expandIconWrapper: ({ theme }) => ({
        '& svg': {
          color: theme.palette.text.secondary,

          '.Mui-disabled &': {
            color: theme.palette.text.disabled
          }
        }
      })
    }
  },
  // MuiAccordionDetails
  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingBottom: theme.spacing(3)
      })
    }
  }
};
