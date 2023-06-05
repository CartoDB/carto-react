import { ClickAwayListener, ToggleButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the toggle button for feature selection UI
 * handles tooltip logic for click away listener and listens on escape key to disable the button
 * <!--
 * @param {Object} props
 * @param {string} [props.className]
 * @param {Object} [props.sx]
 * @param {React.ReactNode} props.icon
 * @param {string} props.hoverTooltip
 * @param {string} props.clickTooltip
 * @param {boolean} [props.enabled]
 * @param {function} [props.onEnabledChange]
 * @param { "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined } [props.tooltipPlacement]
 * -->
 */
function FeatureSelectionUIToggleButton({
  className,
  sx,
  icon,
  hoverTooltip,
  clickTooltip,
  enabled,
  onEnabledChange,
  tooltipPlacement = 'bottom'
}) {
  const [tooltipShown, setTooltipShown] = useState(false);
  const [showClickAwayTooltip, setShowClickAwayTooltip] = useState(enabled);

  useEffect(() => {
    setShowClickAwayTooltip(enabled);
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      const fn = (ev) => {
        if (ev.key === 'Escape') {
          if (onEnabledChange) onEnabledChange(false);
        }
      };
      window.addEventListener('keydown', fn);
      return () => {
        window.removeEventListener('keydown', fn);
      };
    }
  }, [enabled, onEnabledChange]);

  const tooltipTitle = showClickAwayTooltip ? clickTooltip : hoverTooltip;

  return (
    <ClickAwayListener onClickAway={() => setShowClickAwayTooltip(false)}>
      <Tooltip
        className={className}
        sx={sx}
        title={tooltipTitle}
        placement={tooltipPlacement}
        open={tooltipShown}
        onOpen={() => setTooltipShown(true)}
        onClose={() => {
          if (!showClickAwayTooltip) setTooltipShown(false);
        }}
      >
        <ToggleButton
          value='selectedMode'
          selected={enabled}
          onClick={() => onEnabledChange && onEnabledChange(!enabled)}
        >
          {icon}
        </ToggleButton>
      </Tooltip>
    </ClickAwayListener>
  );
}

FeatureSelectionUIToggleButton.propTypes = {
  className: PropTypes.string,
  sx: PropTypes.any,
  icon: PropTypes.element.isRequired,
  hoverTooltip: PropTypes.string.isRequired,
  clickTooltip: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onEnabledChange: PropTypes.func,
  tooltipPlacement: PropTypes.string
};
FeatureSelectionUIToggleButton.defaultProps = {
  className: '',
  sx: undefined,
  onEnabledChange: () => {},
  tooltipPlacement: 'bottom'
};

export default FeatureSelectionUIToggleButton;
