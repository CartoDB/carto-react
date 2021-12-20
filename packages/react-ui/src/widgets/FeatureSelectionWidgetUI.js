import React, { forwardRef, useEffect, useState } from 'react';
import {
  alpha,
  Box,
  capitalize,
  Divider,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  rgbToHex,
  SvgIcon,
  Tooltip,
  Typography,
  useTheme
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import PropTypes from 'prop-types';

const CursorIcon = (
  <SvgIcon>
    <path d='m10.083 19.394.057.113a1 1 0 0 0 1.72.007l2.869-4.786 4.785-2.87a1 1 0 0 0-.12-1.777l-14-6c-.83-.356-1.669.483-1.313 1.313l6.002 14zM6.905 6.904l9.903 4.244-3.322 1.995-.102.069a1 1 0 0 0-.242.274l-1.992 3.321-4.245-9.903z' />
  </SvgIcon>
);

const PolygonIcon = (
  <SvgIcon>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.995 2.995 0 0 0 0 2H6.829a2.995 2.995 0 0 0 0-2h10.342zm-2.463-5.707 3.998 4a3.012 3.012 0 0 0-1.414 1.414l-4-3.999a3.013 3.013 0 0 0 1.31-1.214l.106-.201zM2.998 6.829a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm1.84-3.919c.464.483 1.09.81 1.79.896l-1.47 2.94a2.992 2.992 0 0 0-1.79-.894l1.47-2.942zM16 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9.171.998a2.995 2.995 0 0 0 0 2.002H6.829a2.995 2.995 0 0 0 0-2.002h6.342z' />
  </SvgIcon>
);

const RectangleIcon = (
  <SvgIcon>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.994 2.994 0 0 0-.17.974l-.001.052.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2h10.342zM2.998 6.828a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zm16.001 0a2.995 2.995 0 0 0 2 0v10.342a2.995 2.995 0 0 0-2 0V6.829zM20 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm13.171.998a2.994 2.994 0 0 0-.17.976L17 4.026l.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2H17.17z' />
  </SvgIcon>
);

const DRAW_MODES = [
  { label: 'polygon', icon: PolygonIcon },
  { label: 'rectangle', icon: RectangleIcon }
];

function FeatureSelectionWidgetUI({
  drawModes,
  selectedDrawMode,
  onSelectDrawMode,
  activated,
  onActivatedChange,
  editable,
  tooltipPlacement
}) {
  console.log(activated, selectedDrawMode);

  // If selectedDrawMode isn't given, it's the first draw mode by default
  useEffect(() => {
    if (!selectedDrawMode) {
      onSelectDrawMode(drawModes[0]);
    }
  }, [drawModes, onSelectDrawMode, selectedDrawMode]);

  const onSelectDrawModeWrapper = (...args) => {
    onSelectDrawMode(...args);
    // If the user update selectedDrawMode while it's activated, disable it
    if (activated) {
      onActivatedChange(false);
    }
  };

  // Do not render nothing until selectedDrawMode is filled
  if (!selectedDrawMode) {
    return null;
  }

  return (
    <Wrapper>
      <SelectedDrawMode
        drawMode={selectedDrawMode}
        activated={activated}
        onActivatedChange={onActivatedChange}
        tooltipPlacement={tooltipPlacement}
      />
      <DrawModesSelector
        drawModes={drawModes}
        onSelectDrawMode={onSelectDrawModeWrapper}
        tooltipPlacement={tooltipPlacement}
        editable={editable}
      />
    </Wrapper>
  );
}

FeatureSelectionWidgetUI.defaultProps = {
  drawModes: DRAW_MODES,
  activated: false,
  editable: true,
  tooltipPlacement: 'bottom'
};

const drawModeShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
});

FeatureSelectionWidgetUI.propTypes = {
  drawModes: PropTypes.arrayOf(drawModeShape.isRequired).isRequired,
  selectedDrawMode: drawModeShape,
  onSelectDrawMode: PropTypes.func,
  activated: PropTypes.bool,
  onActivatedChange: PropTypes.func,
  activated: PropTypes.bool,
  tooltipPlacement: PropTypes.string
};

export default FeatureSelectionWidgetUI;

// Aux
const useSelectedDrawModeStyles = makeStyles((theme) => ({
  btn: {
    color: ({ activated }) =>
      activated ? theme.palette.primary.main : theme.palette.text.secondary,
    backgroundColor: ({ activated }) =>
      activated ? alpha(theme.palette.primary.main, 0.05) : null
  }
}));

function SelectedDrawMode({
  drawMode,
  activated = false,
  onActivatedChange,
  tooltipPlacement
}) {
  const classes = useSelectedDrawModeStyles({ activated });

  const { label, icon } = drawMode;

  const onActivatedChangeWrapper = () => onActivatedChange(!activated);

  return (
    <Tooltip title={`Draw a ${label}`} placement={tooltipPlacement} arrow>
      <IconButton onClick={onActivatedChangeWrapper} className={classes.btn}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

const useDrawModesSelectorStyles = makeStyles((theme) => ({
  btn: {
    color: theme.palette.text.secondary,
    width: 24
  },
  divider: {
    margin: theme.spacing(1, 0)
  }
}));

function DrawModesSelector({ drawModes, onSelectDrawMode, tooltipPlacement, editable }) {
  const classes = useDrawModesSelectorStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectDrawMode = (newSelectedDrawMode) => {
    onSelectDrawMode(newSelectedDrawMode);
    handleClose();
  };

  const MenuItemWrapper = forwardRef(({ drawMode }, ref) => (
    <MenuItem ref={ref} onClick={() => handleSelectDrawMode(drawMode)}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {drawMode.icon}
        <Box ml={1}>{capitalize(drawMode.label)}</Box>
      </Box>
    </MenuItem>
  ));

  return (
    <Box>
      <Tooltip title='Select draw modes' placement={tooltipPlacement} arrow>
        <IconButton
          id='fade-button'
          aria-controls='fade-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          className={classes.btn}
          onClick={handleClick}
        >
          <ArrowDropDown />
        </IconButton>
      </Tooltip>
      <Menu
        id='fade-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
      >
        <MenuItem disabled>
          <Typography variant='caption'>Choose a draw mode</Typography>
        </MenuItem>
        {drawModes.map((drawMode) => (
          <MenuItemWrapper key={drawMode.label} drawMode={drawMode} />
        ))}
        {editable && <Divider className={classes.divider} />}
        {editable && (
          <MenuItemWrapper drawMode={{ label: 'Edit geometry', icon: CursorIcon }} />
        )}
      </Menu>
    </Box>
  );
}

const useWrapperStyles = makeStyles((theme) => ({
  root: {
    // cursor: 'pointer',
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.black, 0.05)
    // }
  }
}));

function Wrapper({ shadow = 5, children, tooltipPlacement = 'right' }) {
  const classes = useWrapperStyles();
  return (
    <Paper className={classes.root} elevation={shadow}>
      <Box p={0.5} display='flex' alignItems='center' justifyContent='space-between'>
        {children}
      </Box>
    </Paper>
  );
}
