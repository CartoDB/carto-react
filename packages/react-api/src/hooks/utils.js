export function throwError(error) {
  if (error.name === 'DataCloneError')
    throw new Error(
      `DataCloneError: Unable to retrieve GeoJSON features. Please check that your query is returning a column called "geom" or that you are using the geoColumn property to indicate the geometry column in the table.`
    );
  if (error.name === 'AbortError') return;
  throw error;
}

export function getTileId({ x, y, z }) {
  return `${x}-${y}-${z}`;
}
