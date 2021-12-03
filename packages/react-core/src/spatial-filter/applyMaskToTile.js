import asTileCoords from '../projections/asTileCoords';
import { maskLinesBinaryDataToDFE } from './lines';
import { maskPointsBinaryDataToDFE } from './points';
import { maskPolygonsBinaryDataToDFE } from './polygons';

const EMPTY_ANALYSED_FEATURES = {
  points: [[], []],
  polygons: [[], []],
  lines: [[], []]
};

// Instead of change tile data, add getFilterValue attribute to tile content.
// Return tile content!!
export default function applyMaskToTile(
  tile,
  maskGeometry,
  { uniqueIdProperty = 'cartodb_id', analysedFeatures = EMPTY_ANALYSED_FEATURES } = {}
) {
  const tileId = `${tile.x}-${tile.y}-${tile.z}`;
  const maskGeometryInTileCoords = asTileCoords(maskGeometry, tile.bbox);
  const { content: data } = tile;

  const polygonsFilterRes = maskPolygonsBinaryDataToDFE(
    data.polygons,
    maskGeometryInTileCoords,
    {
      uniqueIdProperty,
      analysedPolygonsFeatures: analysedFeatures.polygons
    }
  );

  // const [linesFilterRes, uniqueLinesFeatureIds] = maskLinesBinaryDataToDFE(
  //   data.lines,
  //   maskGeometryInTileCoords,
  //   {
  //     uniqueIdProperty,
  //     analysedLinesFeatures: analysedFeatures.lines
  //   }
  // );

  // if (uniqueLinesFeatureIds.length) {
  //   setUniqueIdsByTile((oldState) => ({
  //     ...oldState,
  //     [tileId]: uniqueLinesFeatureIds
  //   }));
  // }

  const pointsFilterRes = maskPointsBinaryDataToDFE(
    data.points,
    maskGeometryInTileCoords,
    { uniqueIdProperty, analysedPointFeatures: analysedFeatures.points }
  );

  return {
    ...data,
    points: {
      ...data.points,
      attributes: {
        getFilterValue: { value: pointsFilterRes, size: 1 }
      }
    },
    lines: {
      ...data.lines,
      attributes: {
        getFilterValue: { value: new Uint16Array(), size: 1 }
      }
    },
    polygons: {
      ...data.polygons,
      attributes: {
        getFilterValue: { value: polygonsFilterRes, size: 1 }
      }
    }
  };
}
