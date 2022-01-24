// TODO change this after publish a new version of Deck GL @types
import * as extensions from '@deck.gl/extensions';

const maskExtension = new extensions.MaskExtension();

export function getMaskExtensionProps(maskPolygon) {
  return {
    maskPolygon: maskPolygon || [],
    maskEnabled: Boolean(maskPolygon && maskPolygon.length),
    extensions: [maskExtension]
  };
}
