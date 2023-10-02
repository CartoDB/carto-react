import React, { useState } from 'react';
import { updateLayer } from '@carto/react-redux/';
import { LegendWidgetUI } from '@carto/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import sortLayers from './utils/sortLayers';

/**
 * Renders a <LegendWidget /> component
 * @param  {object} props
 * @param  {string} [props.title] - Title of the widget.
 * @param  {Object.<string, Function>} [props.customLayerOptions] - Allow to add custom controls to a legend item to tweak the associated layer.
 * @param  {Object.<string, Function>} [props.customLegendTypes] - Allow to customise by default legend types that can be rendered.
 * @param  {boolean} [props.initialCollapsed] - Define initial collapsed value. false by default.
 * @param  {string[]} [props.layerOrder] - Array of layer identifiers. Defines the order of layer legends. [] by default.
 * @param  {object} [props.intlConfig] - Object with intl configuration. If not provided, default messages will be used.
 */
function LegendWidget({
  customLayerOptions,
  customLegendTypes,
  initialCollapsed,
  layerOrder = [],
  title,
  intlConfig
}) {
  const dispatch = useDispatch();
  const layers = useSelector((state) =>
    sortLayers(
      Object.values(state.carto.layers).filter((layer) => !!layer.legend),
      layerOrder
    )
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
      title={title}
      customLegendTypes={customLegendTypes}
      customLayerOptions={customLayerOptions}
      layers={layers}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
      collapsed={collapsed}
      onChangeCollapsed={setCollapsed}
      onChangeLegendRowCollapsed={handleChangeLegendRowCollapsed}
      intlConfig={intlConfig}
    />
  );
}

LegendWidget.propTypes = {
  title: PropTypes.string,
  customLegendTypes: PropTypes.objectOf(PropTypes.func),
  initialCollapsed: PropTypes.bool,
  layerOrder: PropTypes.arrayOf(PropTypes.string),
  intlConfig: PropTypes.object
};

LegendWidget.defaultProps = {
  initialCollapsed: false,
  layerOrder: []
};

export default LegendWidget;
