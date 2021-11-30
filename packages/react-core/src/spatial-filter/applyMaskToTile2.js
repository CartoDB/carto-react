import asTileCoords from '../projections/asTileCoords';
import { maskLinesBinaryDataToDFE } from './lines';
import { maskPointsBinaryDataToDFE } from './points';
import { maskPolygonsBinaryDataToDFE } from './polygons';

// Instead of change tile data, add getFilterValue attribute to tile content.
// Return tile content!!
export default function applyMaskToTile2(
  tile,
  maskGeometry,
  { uniqueIdProperty, layerUniqueIdsIn = [], setUniqueIdsByTile } = {}
) {
  const tileId = `${tile.x}-${tile.y}-${tile.z}`;
  const maskGeometryInTileCoords = asTileCoords(maskGeometry, tile.bbox);
  const { content: data } = tile;

  const [polygonsFilterRes, uniquePolygonsFeatureIds] = maskPolygonsBinaryDataToDFE(
    data.polygons,
    maskGeometryInTileCoords,
    {
      uniqueIdProperty,
      layerUniqueIdsIn
    }
  );

  if (uniquePolygonsFeatureIds.length) {
    setUniqueIdsByTile((oldState) => ({
      ...oldState,
      [tileId]: uniquePolygonsFeatureIds
    }));
  }

  const [linesFilterRes, uniqueLinesFeatureIds] = maskLinesBinaryDataToDFE(
    data.lines,
    maskGeometryInTileCoords,
    {
      uniqueIdProperty,
      layerUniqueIdsIn
    }
  );

  if (uniqueLinesFeatureIds.length) {
    setUniqueIdsByTile((oldState) => ({
      ...oldState,
      [tileId]: uniqueLinesFeatureIds
    }));
  }

  const pointsFilterRes = maskPointsBinaryDataToDFE(
    data.points,
    maskGeometryInTileCoords
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
        getFilterValue: { value: linesFilterRes, size: 1 }
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
