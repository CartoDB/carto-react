import { tiles } from '@mapbox/tile-cover';
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
  const cells = getCellsCoverGeometry(
    geometryToIntersect.geometry,
    spatialIndex,
    resolution
  );

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
      if (cellsDictionary[d.id]) {
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
    return Number(_quadbinZoom(data[0].id));
  }

  if (spatialIndex === SpatialIndex.H3) {
    return h3GetResolution(data[0].id);
  }
}

const bboxWest = [-180, -90, 0, 90];
const bboxEast = [0, -90, 180, 90];

function getCellsCoverGeometry(geometry, spatialIndex, resolution) {
  if (spatialIndex === SpatialIndex.QUADBIN) {
    return tiles(geometry, {
      min_zoom: resolution,
      max_zoom: resolution
    }).map(([x, y, z]) => _tileToQuadbin({ x, y, z }));
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

///// ALL THE CODE BELOW WILL BE IMPORTED FROM DECK GL /////////////
const B = [
  0x5555555555555555n,
  0x3333333333333333n,
  0x0f0f0f0f0f0f0f0fn,
  0x00ff00ff00ff00ffn,
  0x0000ffff0000ffffn,
  0x00000000ffffffffn
];
const S = [0n, 1n, 2n, 4n, 8n, 16n];

function _tileToQuadbin(tile) {
  if (tile.z < 0 || tile.z > 26) {
    throw new Error('Wrong zoom');
  }
  // eslint-disable-next-line no-undef
  const z = BigInt(tile.z);
  // eslint-disable-next-line no-undef
  let x = BigInt(tile.x) << (32n - z);
  // eslint-disable-next-line no-undef
  let y = BigInt(tile.y) << (32n - z);

  for (let i = 0; i < 5; i++) {
    const s = S[5 - i];
    const b = B[4 - i];
    x = (x | (x << s)) & b;
    y = (y | (y << s)) & b;
  }

  const quadbin =
    0x4000000000000000n |
    (1n << 59n) | // | (mode << 59) | (mode_dep << 57)
    (z << 52n) |
    ((x | (y << 1n)) >> 12n) |
    (0xfffffffffffffn >> (z * 2n));
  return bigIntToIndex(quadbin);
}

function bigIntToIndex(quadbin) {
  return quadbin.toString(16);
}

function _quadbinZoom(index) {
  const quadbin = indexToBigInt(index);
  return (quadbin >> 52n) & 0x1fn;
}

function indexToBigInt(index) {
  // eslint-disable-next-line no-undef
  return BigInt(`0x${index}`);
}
