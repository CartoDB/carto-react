import asTileCoords from '../projections/asTileCoords';
import { maskLinesBinaryData } from './lines';
import { maskPointsBinaryData } from './points';
import { maskPolygonsBinaryData } from './polygons';

export default function applyMaskToTile(
  tile,
  maskGeometry,
  { uniqueIdProperty, layerUniqueIdsIn = [], setUniqueIdsByTile } = {}
) {
  const tileId = `${tile.x}-${tile.y}-${tile.z}`;
  const maskInTileCoords = asTileCoords(maskGeometry, tile.bbox);

  let polygonsData;
  if (tile.content?.polygons) {
    const [_polygonsData, uniqueFeatureIds] = maskPolygonsBinaryData(
      tile.content.polygons,
      maskInTileCoords,
      { uniqueIdProperty, layerUniqueIdsIn }
    );
    polygonsData = _polygonsData;

    if (uniqueFeatureIds.length) {
      setUniqueIdsByTile((oldState) => ({
        ...oldState,
        [tileId]: uniqueFeatureIds
      }));
    }
  }

  let linesData;
  if (tile.content?.lines) {
    const [_linesData, uniqueFeatureIds] = maskLinesBinaryData(
      tile.content.lines,
      maskInTileCoords,
      { uniqueIdProperty, layerUniqueIdsIn }
    );
    linesData = _linesData;

    if (uniqueFeatureIds.length) {
      setUniqueIdsByTile((oldState) => ({
        ...oldState,
        [tileId]: uniqueFeatureIds
      }));
    }
  }

  let newTile = {
    ...tile,
    ...(tile.content && {
      content: {
        ...tile.content,
        ...(tile.content.points && {
          points: maskPointsBinaryData(tile.content.points, maskInTileCoords)
        }),
        ...(tile.content.lines && {
          lines: linesData
        }),
        ...(tile.content.polygons && {
          polygons: polygonsData
        })
      }
    })
  };

  // Modify original tile to use it in onViewportLoad / workers
  if (newTile) {
    tile.filteredContent = { ...newTile.content };
  }

  return newTile;
}
