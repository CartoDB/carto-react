import { Box, Paper, TextField, styled } from '@mui/material';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

export const LEGEND_WIDTH = 240;

export const LegendRoot = styled(Paper, {
  shouldForwardProp: (prop) => !['collapsed'].includes(prop)
})(({ theme, collapsed }) => ({
  width: collapsed ? 'min-content' : LEGEND_WIDTH,
  background: theme.palette.background.paper,
  maxHeight: 'calc(100% - 120px)',
  display: 'flex',
  flexDirection: 'column'
}));

export const LegendToggleHeader = styled('header', {
  shouldForwardProp: (prop) => !['collapsed'].includes(prop)
})(({ theme, collapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  borderBottom: collapsed ? undefined : `1px solid ${theme.palette.divider}`
}));

export const LegendItemHeader = styled('header')(({ theme }) => ({
  padding: theme.spacing(1.5),
  paddingRight: theme.spacing(2),
  gap: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'space-between',
  position: 'sticky',
  zIndex: 2,
  top: 0,
  background: theme.palette.background.paper
}));

export const StyledOpacityControl = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  padding: theme.spacing(1),
  minWidth: LEGEND_WIDTH - 32
}));

export const OpacityTextField = styled(TextField)(({ theme }) => ({
  display: 'flex',
  width: theme.spacing(7.5),
  flexShrink: 0,
  'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
    {
      '-webkit-appearance': 'none',
      margin: 0
    }
}));

export const LayerVariablesList = styled('ul', {
  shouldForwardProp: (prop) => !['opacity'].includes(prop)
})(({ theme, opacity }) => ({
  opacity,
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1)
}));

export const LegendVariableList = styled('ul')(({ theme }) => ({
  margin: 0,
  padding: 0,
  paddingBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column'
}));

export const LegendIconWrapper = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  width: ICON_SIZE_MEDIUM,
  height: ICON_SIZE_MEDIUM,
  '& img': {
    margin: 'auto',
    display: 'block'
  }
}));

export const LegendContent = styled(Box, {
  shouldForwardProp: (prop) => !['width'].includes(prop)
})(({ width }) => ({
  width,
  overflow: 'auto',
  maxHeight: `calc(100% - 12px)`
}));

export const styles = {};
