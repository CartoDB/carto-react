import React, { useState } from 'react';
import { updateLayer } from '@carto/react-redux/';
import { LegendWidgetUI } from '@carto/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Renders a <LegendWidget /> component
 * @param  {object} props
 * @param  {string} [props.className] - CSS class name
 * @param  {Object.<string, function>} [props.customLayerOptions] - Allow to add custom controls to a legend item to tweak the associated layer
 * @param  {Object.<string, function>} [props.customLegendTypes] - Allow to customise by default legend types that can be rendered
 * @param  {boolean} [props.initialCollapsed] - Define initial collapsed value. false by default.
 */
function LegendWidget({
  className,
  customLayerOptions,
  customLegendTypes,
  initialCollapsed
}) {
  const dispatch = useDispatch();
  const layers = useSelector((state) =>
    Object.values(state.carto.layers).filter((layer) => !!layer.legend)
  );
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  if (!layers.length) {
    return null;
  }

  const handleChangeVisibility = ({ id, visible }) => {
    dispatch(
      updateLayer({
        id,
        layerAttributes: { visible }
      })
    );
  };

  const handleChangeOpacity = ({ id, opacity }) => {
    dispatch(
      updateLayer({
        id,
        layerAttributes: { opacity }
      })
    );
  };

  const handleChangeLegendRowCollapsed = ({ id, collapsed }) => {
    dispatch(
      updateLayer({
        id,
        layerAttributes: { legend: { collapsed } }
      })
    );
  };

  return (
    <LegendWidgetUI
      className={className}
      customLegendTypes={customLegendTypes}
      customLayerOptions={customLayerOptions}
      layers={layers}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
      collapsed={collapsed}
      onChangeCollapsed={setCollapsed}
      onChangeLegendRowCollapsed={handleChangeLegendRowCollapsed}
    />
  );
}

LegendWidget.propTypes = {
  className: PropTypes.string,
  customLegendTypes: PropTypes.objectOf(PropTypes.func),
  initialCollapsed: PropTypes.bool
};

LegendWidget.defaultProps = {
  initialCollapsed: false
};

export default LegendWidget;
