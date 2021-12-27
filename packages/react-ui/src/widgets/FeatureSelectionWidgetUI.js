import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  alpha,
  Box,
  capitalize,
  Chip,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import PropTypes from 'prop-types';

function FeatureSelectionWidgetUI({
  className,
  drawModes,
  editModes,
  selectedMode,
  onSelectMode,
  activated,
  onActivatedChange,
  geometries,
  onSelectGeometry,
  onDeleteGeometry,
  tooltipPlacement
}) {
  return (
    <Wrapper className={className}>
      <Helper
        hasMode={!!selectedMode}
        isEdit={editModes.some((mode) => mode.id === selectedMode)}
        activated={activated}
      >
        <SelectedModeViewer
          modes={[...drawModes, ...editModes.map((mode) => ({ ...mode, isEdit: true }))]}
          selectedMode={selectedMode}
          activated={activated}
          onActivatedChange={onActivatedChange}
          tooltipPlacement={tooltipPlacement}
        />
      </Helper>
      <ModesSelector
        drawModes={drawModes}
        editModes={editModes}
        selectedMode={selectedMode}
        onSelectMode={onSelectMode}
        activated={activated}
        tooltipPlacement={tooltipPlacement}
      />
      {!!geometries?.length && (
        <GeometriesViewer
          geometries={geometries}
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
  activated: false,
  geometries: [],
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
  drawModes: PropTypes.arrayOf(MODE_SHAPE.isRequired).isRequired,
  editModes: PropTypes.arrayOf(MODE_SHAPE.isRequired),
  selectedMode: PropTypes.string.isRequired,
  onSelectMode: PropTypes.func,
  activated: PropTypes.bool,
  onActivatedChange: PropTypes.func,
  geometries: PropTypes.array,
  onSelectGeometry: PropTypes.func,
  tooltipPlacement: PropTypes.string
};

export default FeatureSelectionWidgetUI;

// Aux
function Helper({ hasMode, isEdit, activated, children }) {
  const alreadyOpenedRef = useRef({});
  const shouldOpen = hasMode && activated;

  const [open, setOpen] = useState(shouldOpen);

  useEffect(() => {
    const wasAlreadyOpened = alreadyOpenedRef.current[isEdit];
    if (wasAlreadyOpened) {
      if (open) {
        setOpen(false);
      }
      return;
    }

    if (shouldOpen) {
      alreadyOpenedRef.current = {
        ...alreadyOpenedRef.current,
        [isEdit]: true
      };
      setOpen(true);
      let timeout = setTimeout(() => setOpen(false), 5000);

      return () => clearTimeout(timeout);
    }
    // Logic around show/hide helper tooltip is manage by shouldOpen var
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOpen]);

  return (
    <Tooltip
      title={
        isEdit
          ? 'Select geometry to move or edit it'
          : 'Click on the map to define your spatial filter'
      }
      open={open}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
}

const useGeometriesViewerStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0, 0, 0, 1)
  }
}));

function GeometriesViewer({
  geometries,
  onSelectGeometry,
  onDeleteGeometry,
  tooltipPlacement
}) {
  const classes = useGeometriesViewerStyles();

  const chipLabelFn = useCallback(
    (geometry, idx) => {
      const addIdx = (label) =>
        geometries.length > 1 ? label && `${label} ${idx + 1}` : label;

      return geometry.properties?.label || addIdx('Feature');
    },
    [geometries]
  );

  const isDisabled = (geometry) => geometry.properties?.disabled;

  return (
    <Box ml={2}>
      {geometries.map((geometry, idx) => (
        <Tooltip
          key={idx}
          title={isDisabled(geometry) ? 'Apply filter' : 'Clear filter'}
          placement={tooltipPlacement}
          arrow
        >
          <Chip
            className={idx ? classes.chip : null}
            label={chipLabelFn(geometry, idx)}
            color={isDisabled(geometry) ? 'default' : 'secondary'}
            onClick={() => onSelectGeometry(geometry, idx)}
            onDelete={!!onDeleteGeometry && (() => onDeleteGeometry(geometry, idx))}
          />
        </Tooltip>
      ))}
    </Box>
  );
}

const useSelectedModeViewerStyles = makeStyles((theme) => ({
  btn: {
    color: ({ activated }) =>
      activated ? theme.palette.primary.main : theme.palette.text.secondary,
    backgroundColor: ({ activated }) =>
      activated ? alpha(theme.palette.primary.main, 0.05) : null
  }
}));

function SelectedModeViewer({
  modes,
  selectedMode,
  activated,
  onActivatedChange,
  tooltipPlacement
}) {
  const classes = useSelectedModeViewerStyles({ activated });

  const { label, icon, isEdit } = useMemo(() => {
    if (modes?.length && selectedMode) {
      const foundMode = modes.find(({ id: modeId }) => modeId === selectedMode);
      if (!foundMode) {
        throw new Error(
          'Selected mode provided is not found neither in drawing or edit mode'
        );
      }
      return foundMode;
    } else {
      return {};
    }
  }, [modes, selectedMode]);

  const tooltipTitle = isEdit ? label : `Draw a ${label}`;

  const onActivatedChangeWrapper = () => onActivatedChange(!activated);

  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
      <IconButton onClick={onActivatedChangeWrapper} className={classes.btn}>
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
  activatedMenuItem: {
    backgroundColor: alpha(theme.palette.primary.main, 0.08)
  }
}));

function ModesSelector({
  drawModes,
  editModes,
  selectedMode,
  onSelectMode,
  activated,
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

  const hasDrawModes = !!drawModes.length;
  const hasEditModes = !!editModes.length;

  const MenuItemWrapper = forwardRef(({ mode, isActivated }, ref) => (
    <MenuItem
      className={isActivated ? classes.activatedMenuItem : null}
      ref={ref}
      onClick={() => handleSelectMode(mode.id)}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {mode.icon}
        <Box ml={1}>{capitalize(mode.label)}</Box>
      </Box>
    </MenuItem>
  ));

  const createMenuItemWrapper = (mode) => (
    <MenuItemWrapper
      key={mode.label}
      mode={mode}
      isActivated={activated && selectedMode === mode.id}
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
          <Typography variant='caption'>Choose a draw mode</Typography>
        </MenuItem>
        {hasDrawModes && drawModes.map(createMenuItemWrapper)}
        {hasDrawModes && hasEditModes && <Divider className={classes.divider} />}
        {hasDrawModes && editModes.map(createMenuItemWrapper)}
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
