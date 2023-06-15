import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  capitalize,
  styled,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '../../components/atoms/Typography';

const ArrowButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})(({ isOpen, theme }) => ({
  color: theme.palette.text.secondary,
  width: theme.spacing(3),
  transform: `rotate(${isOpen ? '180' : '0'}deg)`,
  backgroundColor: isOpen ? theme.palette.action.hover : undefined
}));

const SelectionMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'disabled'
})(({ disabled, theme }) => ({
  ...(disabled && {
    pointerEvents: 'none',
    color: theme.palette.text.disabled
  })
}));

const DisabledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-disabled': {
    opacity: 1
  }
}));
/**
 * Renders a `<FeatureSelectionUIDropdown />` component.
 * This component displays the dropdown layout with all available edit and selection modes
 *
 * <!--
 * @param {Object} props
 * @param {Object[]} props.selectionModes
 * @param {string} props.selectionModes[].id
 * @param {string} props.selectionModes[].label
 * @param {React.ReactNode} props.selectionModes[].icon
 * @param {Object[]} props.editModes
 * @param {string} props.editModes[].id
 * @param {string} props.editModes[].label
 * @param {React.ReactNode} props.editModes[].icon
 * @param {string} props.selectedMode
 * @param {boolean} [props.enabled]
 * @param {function} [props.onSelectMode]
 * @param { "bottom" | "left" | "right" | "top" | undefined } [props.tooltipPlacement]
 * @param {string} [props.tooltipText]
 * @param {string} [props.menuHeaderText]
 * @param {boolean} [props.editDisabled]
 * -->
 */
function FeatureSelectionUIDropdown({
  selectionModes,
  editModes,
  selectedMode,
  onSelectMode,
  enabled,
  tooltipPlacement,
  tooltipText = '',
  menuHeaderText = '',
  editDisabled
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelectMode = (newSelectedMode) => {
    if (onSelectMode) {
      onSelectMode(newSelectedMode);
    }
    closeDropdown();
  };

  const showDivider = !!selectionModes.length && !!editModes.length;
  const isEditItem = (mode) => editModes.find((editMode) => editMode.id === mode.id);

  const createMenuItemWrapper = (mode) => (
    <SelectionMenuItem
      key={mode.id}
      selected={enabled && selectedMode === mode.id}
      onClick={() => handleSelectMode(mode.id)}
      disabled={editDisabled && isEditItem(mode)}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {mode.icon}
        <Box ml={2}>
          <Typography variant='body2' color='inherit'>
            {capitalize(mode.label)}
          </Typography>
        </Box>
      </Box>
    </SelectionMenuItem>
  );

  return (
    <>
      <Tooltip title={tooltipText} placement={tooltipPlacement}>
        <ArrowButton
          id='feature-selection-menu-button'
          aria-controls='feature-selection-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={openDropdown}
          isOpen={open}
        >
          <KeyboardArrowDown />
        </ArrowButton>
      </Tooltip>
      <Menu
        id='feature-selection-menu'
        style={{ zIndex: theme.zIndex.tooltip + 1 }}
        anchorEl={anchorEl}
        open={open}
        onClose={closeDropdown}
        MenuListProps={{ 'aria-labelledby': 'feature-selection-menu-button' }}
      >
        {menuHeaderText && (
          <DisabledMenuItem disabled>
            <Typography variant='caption' color='textSecondary'>
              {menuHeaderText}
            </Typography>
          </DisabledMenuItem>
        )}
        {!!selectionModes.length && selectionModes.map(createMenuItemWrapper)}
        {showDivider && <Divider sx={{ margin: ({ spacing }) => spacing(1, 0) }} />}
        {!!editModes.length && editModes.map(createMenuItemWrapper)}
      </Menu>
    </>
  );
}

const MODE_SHAPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
});

FeatureSelectionUIDropdown.propTypes = {
  selectionModes: PropTypes.arrayOf(MODE_SHAPE.isRequired).isRequired,
  editModes: PropTypes.arrayOf(MODE_SHAPE.isRequired),
  selectedMode: PropTypes.string.isRequired,
  onSelectMode: PropTypes.func,
  enabled: PropTypes.bool,
  tooltipPlacement: PropTypes.string,
  tooltipText: PropTypes.string,
  menuHeaderText: PropTypes.string,
  editDisabled: PropTypes.bool
};
FeatureSelectionUIDropdown.defaultProps = {
  onSelectMode: () => {},
  tooltipPlacement: 'bottom',
  tooltipText: '',
  menuHeaderText: ''
};

export default FeatureSelectionUIDropdown;
