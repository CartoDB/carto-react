import React from 'react';
import PropTypes from 'prop-types';
import { ICON_SIZE_MEDIUM } from '../../../theme/themeConstants';
import {
  LegendIconImageWrapper,
  LegendIconWrapper,
  LegendVariableList
} from '../LegendWidgetUI.styles';
import LegendLayerTitle from '../LegendLayerTitle';

/**
 * @param {object} props
 * @param {import('../LegendWidgetUI').LegendLayerVariableBase & import('../LegendWidgetUI').LegendIcons} props.legend - legend variable data.
 * @returns {React.ReactNode}
 */
function LegendIcon({ legend }) {
  const { labels = [], icons = [] } = legend;
  return (
    <LegendVariableList data-testid='icon-legend'>
      {labels.map((label, idx) => (
        <LegendIconWrapper key={label}>
          <LegendIconImageWrapper>
            <img src={icons[idx]} alt={label} width='auto' height={ICON_SIZE_MEDIUM} />
          </LegendIconImageWrapper>
          <LegendLayerTitle
            visible
            title={label}
            typographyProps={{ variant: 'overline', my: 0.75 }}
          />
        </LegendIconWrapper>
      ))}
    </LegendVariableList>
  );
}

LegendIcon.defaultProps = {
  legend: {
    labels: [],
    icons: []
  }
};

LegendIcon.propTypes = {
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default LegendIcon;
