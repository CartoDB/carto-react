import React from 'react';
import { useSelector } from 'react-redux';
import { LegendUI } from '../ui';

/**
 * Renders a <LegendWidget /> component
 * @param  props
 */
function LegendWidget(props) {
  const stateLayers = useSelector((state) => state.carto.layers);

  if (Object.keys(stateLayers).length === 0) return null;

  const layers = Object.entries(stateLayers)
    .filter((elem) => elem[1].legend !== undefined)
    .map((elem) => {
      return { legend: elem[1].legend, metadata: elem[1].metadata };
    });

  return <LegendUI layers={layers}></LegendUI>;
}

LegendWidget.propTypes = {
  // onChangeVisibility: PropTypes.bool
};

LegendWidget.defaultProps = {};

export default LegendWidget;
