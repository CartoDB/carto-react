import React, { useState } from 'react';
import { updateLayer } from '@carto/react-redux/';
import { LegendWidgetUI } from '@carto/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Renders a <LegendWidget /> component
 * @param  {object} props
 * @param  {string} props.className - CSS class name
 * @param  {Object.<string, function>} props.legendTypes - Allow to customise by default legend types that can be rendered
 * @param  {string} props.initialCollapsed - Define initial collapsed value. false by default.
 */
function LegendWidget({ className, legendTypes, initialCollapsed }) {
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

  return (
    <LegendWidgetUI
      className={className}
      legendTypes={legendTypes}
      layers={layers}
      onChangeVisibility={handleChangeVisibility}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
    />
  );
}

LegendWidget.propTypes = {
  className: PropTypes.string,
  legendTypes: PropTypes.objectOf(PropTypes.func),
  initialCollapsed: PropTypes.bool
};

LegendWidget.defaultProps = {
  initialCollapsed: false
};

export default LegendWidget;
