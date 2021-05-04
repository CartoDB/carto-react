import { updateLayer } from '@carto/react-redux/';
import { LegendWidgetUI } from '@carto/react-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

export default function LegendWidget({ className }) {
  const dispatch = useDispatch();

  const legends = useSelector((state) => {
    return Object.values(state.carto.layers).reduce((acc, { id, title, switchable, visible, legend }) => {
      if (!!legend) {
        acc.push({ id, ...legend, switchable, title, visible })
      }
      return acc
    }, [])
  });

  const onChangeVisibility = ({ id, visible }) => {
    dispatch(
      updateLayer({
        id,
        layerAttributes: { visible }
      })
    )
  }

  return <>
    <LegendWidgetUI className={className} legends={legends} onChangeVisibility={onChangeVisibility} />
  </>
}
