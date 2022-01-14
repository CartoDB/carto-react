// TODO change this after publish a new version of Deck GL @types
import * as _extensions from '@deck.gl/extensions';
import { getMaskExtensionProps } from '../../src/hooks/maskExtensionUtil';

describe('mask-extension-util', () => {
  test('correct values without maskPolygon', () => {
    const myMaskPolygon = undefined;
    const { maskPolygon, maskEnabled, extensions } = getMaskExtensionProps(myMaskPolygon);

    expect(maskPolygon).toEqual([]);
    expect(maskEnabled).toEqual(false);
    expect(extensions[0]).toBeInstanceOf(_extensions.MaskExtension);
  });

  test('correct values width maskPolygon', () => {
    const myMaskPolygon = [
      [-41.484375, 35.17380831799959],
      [0.3515625, 35.17380831799959],
      [0.3515625, 53.330872983017066],
      [-41.484375, 53.330872983017066],
      [-41.484375, 35.17380831799959]
    ];
    const { maskPolygon, maskEnabled, extensions } = getMaskExtensionProps(myMaskPolygon);

    expect(maskPolygon).toEqual(myMaskPolygon);
    expect(maskEnabled).toEqual(true);
    expect(extensions[0]).toBeInstanceOf(_extensions.MaskExtension);
  });
});
