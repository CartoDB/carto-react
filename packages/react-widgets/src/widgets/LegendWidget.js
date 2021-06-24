import React from 'react';
import { updateLayer } from '@carto/react-redux/';
import { LegendWidgetUI } from '@carto/react-ui';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function LegendWidget() {
  const dispatch = useDispatch();
  const legends = useSelector((state) => {
    return Object.values(state.carto.layers).filter((layer) => !!layer.legend);
  });

  const onChangeVisibility = ({ id, visible }) => {
    dispatch(
      updateLayer({
        id,
        layerAttributes: { visible }
      })
    );
  };

  return <LegendWidgetUI legends={legends} onChangeVisibility={onChangeVisibility} />;
}
