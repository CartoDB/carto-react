import { MASK_ID } from '@carto/react-core/';
import { MaskExtension } from '@deck.gl/extensions';
import { getMaskExtensionProps } from '../../src/hooks/maskExtensionUtil';

describe('mask-extension-util', () => {
  test('correct values without maskPolygon', () => {
    const myMaskPolygon = undefined;
    const { maskId, extensions } = getMaskExtensionProps(myMaskPolygon);

    expect(maskId).toEqual(false);
    expect(extensions[0]).toBeInstanceOf(MaskExtension);
  });

  test('correct values width maskPolygon', () => {
    const myMaskPolygon = [
      [-41.484375, 35.17380831799959],
      [0.3515625, 35.17380831799959],
      [0.3515625, 53.330872983017066],
      [-41.484375, 53.330872983017066],
      [-41.484375, 35.17380831799959]
    ];
    const { maskId, extensions } = getMaskExtensionProps(myMaskPolygon);

    expect(maskId).toEqual(MASK_ID);
    expect(extensions[0]).toBeInstanceOf(MaskExtension);
  });
});
