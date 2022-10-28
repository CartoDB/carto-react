import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  alpha,
  Box,
  capitalize,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useTheme
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ArrowDropDown } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';

function FeatureSelectionWidgetUI({
  className,
  selectionModes,
  editModes,
  selectedMode,
  onSelectMode,
  enabled,
  onEnabledChange,
  geometry,
  onSelectGeometry,
  onDeleteGeometry,
  tooltipPlacement
}) {
  return (
    <Wrapper className={className}>
      <Helper
        hasMode={!!selectedMode}
        isEdit={editModes.some((mode) => mode.id === selectedMode)}
        enabled={enabled}
      >
        <SelectedModeViewer
          modes={[
            ...selectionModes,
            ...editModes.map((mode) => ({ ...mode, isEdit: true }))
          ]}
          selectedMode={selectedMode}
          enabled={enabled}
          onEnabledChange={onEnabledChange}
          tooltipPlacement={tooltipPlacement}
        />
      </Helper>
      <ModesSelector
        selectionModes={selectionModes}
        editModes={editModes}
        selectedMode={selectedMode}
        onSelectMode={onSelectMode}
        enabled={enabled}
        tooltipPlacement={tooltipPlacement}
      />
      {!!geometry && (
        <GeometryViewer
          geometry={geometry}
          onSelectGeometry={onSelectGeometry}
          onDeleteGeometry={onDeleteGeometry}
          tooltipPlacement={tooltipPlacement}
        />
      )}
    </Wrapper>
  );
}

FeatureSelectionWidgetUI.defaultProps = {
  className: '',
  enabled: false,
  tooltipPlacement: 'bottom',
  editModes: []
};

const MODE_SHAPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
});

FeatureSelectionWidgetUI.propTypes = {
  className: PropTypes.string,
  selectionModes: PropTypes.arrayOf(MODE_SHAPE.isRequired).isRequired,
  editModes: PropTypes.arrayOf(MODE_SHAPE.isRequired),
  selectedMode: PropTypes.string.isRequired,
  onSelectMode: PropTypes.func,
  enabled: PropTypes.bool,
  onEnabledChange: PropTypes.func,
  geometry: PropTypes.any,
  onSelectGeometry: PropTypes.func,
  tooltipPlacement: PropTypes.string
};

export default FeatureSelectionWidgetUI;

// Aux
function Helper({ hasMode, enabled, isEdit, children }) {
  const alreadyOpenedRef = useRef({});
  const shouldOpen = hasMode && enabled;

  const [open, setOpen] = useState(shouldOpen);

  useEffect(() => {
    const wasAlreadyOpened = alreadyOpenedRef.current[isEdit];
    if (wasAlreadyOpened) {
      setOpen(false);
      return;
    }

    if (shouldOpen) {
      alreadyOpenedRef.current = {
        ...alreadyOpenedRef.current,
        [isEdit]: true
      };
      setOpen(true);
      const timeout = setTimeout(() => setOpen(false), 5000);

      return () => clearTimeout(timeout);
    }
    // Logic around show/hide helper tooltip is manage by shouldOpen var
  }, [shouldOpen, isEdit]);

  return (
    <Tooltip
      title={
        isEdit ? 'Click on the mask to edit it' : 'Click on the map to create a mask'
      }
      open={open}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
}

function GeometryViewer({
  geometry,
  onSelectGeometry,
  onDeleteGeometry,
  tooltipPlacement
}) {
  const isDisabled = geometry.properties?.disabled;

  return (
    <Box ml={2}>
      <Tooltip
        title={isDisabled ? 'Apply mask' : 'Clear mask'}
        placement={tooltipPlacement}
        arrow
      >
        <Chip
          label='Mask'
          color={isDisabled ? 'default' : 'secondary'}
          onClick={() => onSelectGeometry()}
          onDelete={!!onDeleteGeometry && (() => onDeleteGeometry())}
        />
      </Tooltip>
    </Box>
  );
}

const useSelectedModeViewerStyles = makeStyles((theme) => ({
  btn: {
    color: ({ enabled }) =>
      enabled ? theme.palette.primary.main : theme.palette.text.secondary,
    backgroundColor: ({ enabled }) =>
      enabled ? alpha(theme.palette.primary.main, 0.05) : null
  }
}));

function SelectedModeViewer({
  modes,
  selectedMode,
  enabled,
  onEnabledChange,
  tooltipPlacement
}) {
  const classes = useSelectedModeViewerStyles({ enabled });

  const { label, icon, isEdit } = useMemo(() => {
    if (modes?.length && selectedMode) {
      const foundMode = modes.find(({ id: modeId }) => modeId === selectedMode);
      if (!foundMode) {
        throw new Error('Selected mode not supported');
      }
      return foundMode;
    } else {
      return {};
    }
  }, [modes, selectedMode]);

  const tooltipTitle = isEdit ? label : `Select a ${label}`;

  const onEnabledChangeWrapper = () => onEnabledChange(!enabled);

  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
      <IconButton onClick={onEnabledChangeWrapper} className={classes.btn} size='large'>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

const useModesSelectorStyles = makeStyles((theme) => ({
  btn: {
    color: theme.palette.text.secondary,
    width: 24
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  enabledMenuItem: {
    backgroundColor: alpha(theme.palette.primary.main, 0.08)
  }
}));

function ModesSelector({
  selectionModes,
  editModes,
  selectedMode,
  onSelectMode,
  enabled,
  tooltipPlacement
}) {
  const theme = useTheme();
  const classes = useModesSelectorStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectMode = (newSelectedMode) => {
    onSelectMode(newSelectedMode);
    handleClose();
  };

  const hasSelectionModes = !!selectionModes.length;
  const hasEditModes = !!editModes.length;

  const MenuItemWrapper = forwardRef(({ mode, isEnabled }, ref) => (
    <MenuItem
      className={isEnabled ? classes.enabledMenuItem : null}
      ref={ref}
      onClick={() => handleSelectMode(mode.id)}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {mode.icon}
        <Box ml={2}>
          <Typography variant='body2'>{capitalize(mode.label)}</Typography>
        </Box>
      </Box>
    </MenuItem>
  ));

  const createMenuItemWrapper = (mode) => (
    <MenuItemWrapper
      key={mode.label}
      mode={mode}
      isEnabled={enabled && selectedMode === mode.id}
    />
  );

  return (
    <Box>
      <Tooltip title='Select a mode' placement={tooltipPlacement} arrow>
        <IconButton
          id='fade-button'
          aria-controls='fade-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          className={classes.btn}
          onClick={handleClick}
          size='large'
        >
          <ArrowDropDown />
        </IconButton>
      </Tooltip>
      <Menu
        style={{ zIndex: theme.zIndex.tooltip + 1 }}
        id='fade-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
      >
        <MenuItem disabled>
          <Typography variant='caption'>Choose a selection mode</Typography>
        </MenuItem>
        {hasSelectionModes && selectionModes.map(createMenuItemWrapper)}
        {hasSelectionModes && hasEditModes && <Divider className={classes.divider} />}
        {hasSelectionModes && editModes.map(createMenuItemWrapper)}
      </Menu>
    </Box>
  );
}

const useWrapperStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 16%), 0px 5px 8px 0px rgb(0 0 0 / 8%), 0px 1px 14px 0px rgb(0 0 0 / 4%)'
  }
}));

function Wrapper({ className, children }) {
  const classes = useWrapperStyles();
  return (
    <Box
      className={`${classes.root} ${className}`}
      p={0.5}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    >
      {children}
    </Box>
  );
}
