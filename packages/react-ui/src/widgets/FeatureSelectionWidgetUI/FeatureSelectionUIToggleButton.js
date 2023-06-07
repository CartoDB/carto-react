import { ClickAwayListener, ToggleButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the toggle button for feature selection UI
 * handles tooltip logic for click away listener and listens on escape key to disable the button
 * <!--
 * @param {Object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.hoverTooltip
 * @param {string} props.clickTooltip
 * @param {boolean} [props.enabled]
 * @param {function} [props.onEnabledChange]
 * @param { "bottom" | "left" | "right" | "top" | undefined } [props.tooltipPlacement]
 * -->
 */
function FeatureSelectionUIToggleButton({
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
  icon: PropTypes.element.isRequired,
  hoverTooltip: PropTypes.string.isRequired,
  clickTooltip: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onEnabledChange: PropTypes.func,
  tooltipPlacement: PropTypes.string
};
FeatureSelectionUIToggleButton.defaultProps = {
  onEnabledChange: () => {},
  tooltipPlacement: 'bottom'
};

export default FeatureSelectionUIToggleButton;
