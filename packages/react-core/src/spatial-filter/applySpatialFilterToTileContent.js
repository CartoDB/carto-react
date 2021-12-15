import { transformWGS84ToTileCoords } from '../projections/wgs84ToTileCoords';
import {
  applySpatialFilterToLines,
  applySpatialFilterToPoints,
  applySpatialFilterToPolygons
} from './helpers';

export function applySpatialFilterToTileContent({
  tileContent,
  tileBbox,
  filteringGeometry,
  analysedFeatures,
  uniqueIdProperty = 'cartodb_id'
}) {
  const geometryInTileCoords = transformWGS84ToTileCoords(filteringGeometry, tileBbox);

  const polygonsFilterRes = applySpatialFilterToPolygons(
    tileContent.polygons,
    geometryInTileCoords,
    { uniqueIdProperty, analysedPolygonsFeatures: analysedFeatures.polygons }
  );

  const linesFilterRes = applySpatialFilterToLines(
    tileContent.lines,
    geometryInTileCoords,
    { uniqueIdProperty, analysedLinesFeatures: analysedFeatures.lines }
  );

  const pointsFilterRes = applySpatialFilterToPoints(
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
