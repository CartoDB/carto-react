// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'FeaturesDroppedLoader',
  module: 'carto',
  category: 'geometry',
  extensions: [],
  // By only specifying `carto-vector-tile` the SpatialIndexLayer will not use this loader
  mimeTypes: ['application/vnd.carto-vector-tile'],
  parse: async (arrayBuffer, options, context) => {
    const isDroppingFeatures =
      context.response.headers['features-dropped-from-tile'] === 'true';
    const result = await context.parse(arrayBuffer, options, context);
    return result ? { ...result, isDroppingFeatures } : null;
  }
};
