import { MASK_ID } from '@carto/react-core/';
import { MaskExtension } from '@deck.gl/extensions';

const maskExtension = new MaskExtension();

export function getMaskExtensionProps(maskPolygon) {
  return {
    maskId: Boolean(maskPolygon && maskPolygon.length) && MASK_ID,
    extensions: [maskExtension]
  };
}
