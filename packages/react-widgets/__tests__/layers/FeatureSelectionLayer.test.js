import { renderHook } from '@testing-library/react-hooks';
import { EventManager } from 'mjolnir.js';
import FeatureSelectionLayer from '../../src/layers/FeatureSelectionLayer';
import { mockReduxHooks } from '../mockReduxHooks';

describe('FeatureSelectionLayer', () => {
  mockReduxHooks();
  describe('Google Maps Raster compatibility', () => {
    test('billboard property must be false', () => {
      const eventManager = new EventManager(document.createElement('div'), {});
      // @ts-ignore
      const { result: layers } = renderHook(() =>
        FeatureSelectionLayer({ mask: true, eventManager })
      );
      expect(
        layers.current.find((l) => l.id === 'FeatureSelectionLayer').props.billboard
      ).toBe(false);
    });
  });
});
