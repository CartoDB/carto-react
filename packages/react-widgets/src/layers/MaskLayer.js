import { useSelector } from 'react-redux';
import { SolidPolygonLayer } from '@deck.gl/layers/typed';
import { MASK_ID } from '@carto/react-core/';
import { selectSpatialFilter } from '@carto/react-redux/';

export default function MaskLayer() {
  const spatialFilterGeometry = useSelector((state) => selectSpatialFilter(state));
  const maskData = !!spatialFilterGeometry
    ? [{ polygon: spatialFilterGeometry?.geometry?.coordinates }]
    : [];

  return new SolidPolygonLayer({
    id: MASK_ID,
    operation: 'mask',
    data: maskData,
    getFillColor: [255, 255, 255, 255]
  });
}
