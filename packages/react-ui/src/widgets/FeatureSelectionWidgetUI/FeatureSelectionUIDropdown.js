import { ArrowDropDown } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  capitalize,
  styled,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StyledButtonArrow = styled(IconButton)(({ theme: { spacing, palette } }) => ({
  color: palette.text.secondary,
  width: spacing(3)
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
 * -->
 */
function FeatureSelectionUIDropdown({
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

  const createMenuItemWrapper = (mode) => (
    <MenuItem
      key={mode.id}
      selected={enabled && selectedMode === mode.id}
      onClick={() => handleSelectMode(mode.id)}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {mode.icon}
        <Box ml={2}>
          <Typography variant='body2'>{capitalize(mode.label)}</Typography>
        </Box>
      </Box>
    </MenuItem>
  );

  return (
    <>
      <Tooltip title='Choose a tool' placement={tooltipPlacement}>
        <StyledButtonArrow
          id='feature-selection-menu-button'
          aria-controls='feature-selection-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={openDropdown}
        >
          <ArrowDropDown />
        </StyledButtonArrow>
      </Tooltip>
      <Menu
        id='feature-selection-menu'
        style={{ zIndex: theme.zIndex.tooltip + 1 }}
        anchorEl={anchorEl}
        open={open}
        onClose={closeDropdown}
        MenuListProps={{ 'aria-labelledby': 'feature-selection-menu-button' }}
      >
        <MenuItem disabled>
          <Typography variant='caption'>Choose a drawing tool</Typography>
        </MenuItem>
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
  tooltipPlacement: PropTypes.string
};
FeatureSelectionUIDropdown.defaultProps = {
  onSelectMode: () => {},
  tooltipPlacement: 'bottom'
};

export default FeatureSelectionUIDropdown;
