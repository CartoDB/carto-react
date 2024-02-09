import React, { useState } from 'react';
import { updateLayer } from '@carto/react-redux/';
import { LegendWidgetUI } from '@carto/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import sortLayers from './utils/sortLayers';
import { useMediaQuery } from '@mui/material';

/**
 * Renders a <LegendWidget /> component
 * @param  {object} props
 * @param  {string} [props.title] - Title of the widget.
 * @param  {Object.<string, Function>} [props.customLegendTypes] - Allow to customise by default legend types that can be rendered.
 * @param  {boolean} [props.initialCollapsed] - Define initial collapsed value. false by default.
 * @param  {string[]} [props.layerOrder] - Array of layer identifiers. Defines the order of layer legends. [] by default.
 * @returns {React.ReactNode}
 */
function LegendWidget({ customLegendTypes, initialCollapsed, layerOrder = [], title }) {
  const dispatch = useDispatch();
  const layers = useSelector((state) =>
    sortLayers(
      Object.values(state.carto.layers).filter((layer) => !!layer.legend),
      layerOrder
    )
  );
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { zoom, maxZoom, minZoom } = useSelector((state) => state.carto.viewState);

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
        layerAttributes: { collapsed }
      })
    );
  };

  const handleSelectionChange = ({ id, index, selection }) => {
    const layer = layers.find((layer) => layer.id === id);
    const isMultiple = Array.isArray(selection);
    const legend = isMultiple ? layer.legend : layer.legend[index];
    const newLegend = {
      ...legend,
      select: {
        ...legend.select,
        value: selection
      }
    };

    dispatch(
      updateLayer({
        id,
        layerAttributes: {
          legend: isMultiple
            ? layer.legend.map((l, i) => (i === index ? newLegend : l))
            : newLegend
        }
      })
    );
  };

  return (
    <LegendWidgetUI
      title={title}
      customLegendTypes={customLegendTypes}
      layers={layers}
      collapsed={collapsed}
      onChangeCollapsed={setCollapsed}
      onChangeLegendRowCollapsed={handleChangeLegendRowCollapsed}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
      onChangeSelection={handleSelectionChange}
      isMobile={isMobile}
      currentZoom={zoom}
      maxZoom={maxZoom}
      minZoom={minZoom}
    />
  );
}

LegendWidget.propTypes = {
  title: PropTypes.string,
  customLegendTypes: PropTypes.objectOf(PropTypes.func),
  initialCollapsed: PropTypes.bool,
  layerOrder: PropTypes.arrayOf(PropTypes.string)
};

LegendWidget.defaultProps = {
  initialCollapsed: false,
  layerOrder: []
};

export default LegendWidget;
