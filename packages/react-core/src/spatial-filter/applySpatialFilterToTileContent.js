import asTileCoords from '../projections/asTileCoords';
import { maskLinesBinaryDataToDFE } from './lines';
import { maskPointsBinaryDataToDFE } from './points';
import { maskPolygonsBinaryDataToDFE } from './polygons';

export default function applySpatialFilterToTileContent(
  tileContent,
  geometry,
  { tileBbox, uniqueIdProperty = 'cartodb_id', analysedFeatures } = {}
) {
  const geometryInTileCoords = asTileCoords(geometry, tileBbox);

  const polygonsFilterRes = maskPolygonsBinaryDataToDFE(
    tileContent.polygons,
    geometryInTileCoords,
    { uniqueIdProperty, analysedPolygonsFeatures: analysedFeatures.polygons }
  );

  const linesFilterRes = maskLinesBinaryDataToDFE(
    tileContent.lines,
    geometryInTileCoords,
    { uniqueIdProperty, analysedLinesFeatures: analysedFeatures.lines }
  );

  const pointsFilterRes = maskPointsBinaryDataToDFE(
    tileContent.points,
    geometryInTileCoords,
    { uniqueIdProperty, analysedPointsFeatures: analysedFeatures.points }
  );

  return {
    ...tileContent,
    points: {
      ...tileContent.points,
      attributes: {
        getFilterValue: { value: pointsFilterRes, size: 1 }
      }
    },
    lines: {
      ...tileContent.lines,
      attributes: {
        getFilterValue: { value: linesFilterRes, size: 1 }
      }
    },
    polygons: {
      ...tileContent.polygons,
      attributes: {
        getFilterValue: { value: polygonsFilterRes, size: 1 }
      }
    }
  };
}
