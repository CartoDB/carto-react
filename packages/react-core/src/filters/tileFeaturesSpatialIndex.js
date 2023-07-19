import { getResolution as quadbinGetResolution, geometryToCells } from 'quadbin';

// h3-js has a known problem that does not allow us to use it in a web-worker. To solve
// it we're overwriting the node_module package after install it (check postinstall script in the package.json and the patches/h3-js+3.7.2.patch file)
// To know more about the h3-js issue check https://github.com/uber/h3-js/issues/117
import { h3GetResolution, polyfill } from 'h3-js';
import bboxClip from '@turf/bbox-clip';
import { SpatialIndex } from '../operations/constants/SpatialIndexTypes';

export default function tileFeaturesSpatialIndex({
  tiles,
  geometryToIntersect,
  geoColumName,
  spatialIndex
}) {
  const map = new Map();
  const resolution = getResolution(tiles, spatialIndex);
  const spatialIndexIDName = geoColumName ? geoColumName : spatialIndex;

  if (!resolution) {
    return [];
  }
  const cells = getCellsCoverGeometry(geometryToIntersect, spatialIndex, resolution);

  if (!cells?.length) {
    return [];
  }
  // We transform cells to object to improve the performace
  const cellsDictionary = cells.reduce((prev, current) => {
    prev[current] = {};
    return prev;
  }, {});

  for (const tile of tiles) {
    if (tile.isVisible === false || !tile.data) {
      continue;
    }

    tile.data.forEach((d) => {
      if (d.id in cellsDictionary) {
        map.set(d.id, { ...d.properties, [spatialIndexIDName]: d.id });
      }
    });
  }
  return Array.from(map.values());
}

function getResolution(tiles, spatialIndex) {
  const data = tiles.find((tile) => tile.data?.length)?.data;

  if (!data) {
    return;
  }

  if (spatialIndex === SpatialIndex.QUADBIN) {
    return Number(quadbinGetResolution(data[0].id));
  }

  if (spatialIndex === SpatialIndex.H3) {
    return h3GetResolution(data[0].id);
  }
}

const bboxWest = [-180, -90, 0, 90];
const bboxEast = [0, -90, 180, 90];

function getCellsCoverGeometry(geometry, spatialIndex, resolution) {
  if (spatialIndex === SpatialIndex.QUADBIN) {
    return geometryToCells(geometry, resolution);
  }

  if (spatialIndex === SpatialIndex.H3) {
    // The current H3 polyfill algorithm can't deal with polygon segments of greater than 180 degrees longitude
    // so we clip the geometry to be sure that none of them is greater than 180 degrees
    // https://github.com/uber/h3-js/issues/24#issuecomment-431893796
    return polyfill(
      // @ts-ignore
      bboxClip(geometry, bboxWest).geometry.coordinates,
      resolution,
      true
    ).concat(
      polyfill(
        // @ts-ignore
        bboxClip(geometry, bboxEast).geometry.coordinates,
        resolution,
        true
      )
    );
  }
}
