import { MVTWorkerLoader } from '@loaders.gl/mvt';
import { selectLoader } from '@loaders.gl/core';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'FeaturesDroppedLoader',
  module: 'carto',
  category: 'geometry',
  extensions: [],
  // By only specifying `carto-vector-tile` the SpatialIndexLayer will not use this loader
  mimeTypes: ['application/vnd.carto-vector-tile', ...MVTWorkerLoader.mimeTypes],
  parse: async (arrayBuffer, options, context) => {
    const { headers } = context.response;
    const isDroppingFeatures = headers['features-dropped-from-tile'] === 'true';

    // Obtain a registered loader to actually parse the data
    let loader = null;
    options.mimeType = options.mimeType || headers['content-type'];
    if (MVTWorkerLoader.mimeTypes.includes(options.mimeType)) {
      loader = MVTWorkerLoader;
    } else {
      const dummyBlob = new Blob([], { type: options.mimeType });
      loader = await selectLoader(dummyBlob);
    }
    const result = await context.parse(arrayBuffer, loader, options, context);
    return result ? { ...result, isDroppingFeatures } : null;
  }
};
