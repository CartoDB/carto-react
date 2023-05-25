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
  styled,
  Tooltip,
  useTheme
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Typography from '../components/atoms/Typography';

function FeatureSelectionWidgetUI({
  className,
  sx,
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
    <Wrapper sx={sx} className={className}>
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
  sx: undefined,
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
  sx: PropTypes.any,
  className: PropTypes.any,
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

const StyledSelectedModeViewerButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'enabled'
})(({ theme: { palette }, enabled }) => ({
  color: enabled ? palette.primary.main : palette.text.secondary,
  backgroundColor: enabled ? alpha(palette.primary.main, 0.05) : null
}));

function SelectedModeViewer({
  modes,
  selectedMode,
  enabled,
  onEnabledChange,
  tooltipPlacement
}) {
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
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <StyledSelectedModeViewerButton onClick={onEnabledChangeWrapper} enabled={enabled}>
        {icon}
      </StyledSelectedModeViewerButton>
    </Tooltip>
  );
}

const StyledButtonArrow = styled(IconButton)(({ theme: { palette } }) => ({
  color: palette.text.secondary,
  width: 24
}));

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'enabled'
})(({ theme: { palette }, enabled }) => ({
  ...(enabled && { backgroundColor: alpha(palette.primary.main, 0.08) })
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
    <StyledMenuItem
      enabled={isEnabled}
      ref={ref}
      onClick={() => handleSelectMode(mode.id)}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {mode.icon}
        <Box ml={2}>
          <Typography variant='body2'>{capitalize(mode.label)}</Typography>
        </Box>
      </Box>
    </StyledMenuItem>
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
      <Tooltip title='Select a mode' placement={tooltipPlacement}>
        <StyledButtonArrow
          id='fade-button'
          aria-controls='fade-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <ArrowDropDown />
        </StyledButtonArrow>
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
        {hasSelectionModes && hasEditModes && (
          <Divider
            sx={{
              margin: ({ spacing }) => spacing(1, 0)
            }}
          />
        )}
        {hasSelectionModes && editModes.map(createMenuItemWrapper)}
      </Menu>
    </Box>
  );
}

const StylesWrapper = styled('div')(({ theme: { spacing, palette, shape } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing(0.5),
  backgroundColor: palette.common.white,
  color: palette.text.primary,
  borderRadius: shape.borderRadius,
  boxShadow:
    '0px 3px 5px -1px rgb(0 0 0 / 16%), 0px 5px 8px 0px rgb(0 0 0 / 8%), 0px 1px 14px 0px rgb(0 0 0 / 4%)'
}));

function Wrapper({ sx, className, children }) {
  return (
    <StylesWrapper className={className} sx={sx}>
      {children}
    </StylesWrapper>
  );
}
