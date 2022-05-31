import React from 'react';
import { render, screen } from '@testing-library/react';
import LegendWidgetUI, { LEGEND_TYPES } from '../../../src/widgets/legend/LegendWidgetUI';

const LAYER_OPTIONS = {
  PALETTE_SELECTOR: 'PALETTE_SELECTOR'
};

const LAYER_OPTIONS_COMPONENTS = {
  [LAYER_OPTIONS.PALETTE_SELECTOR]: PaletteSelector
};

function PaletteSelector() {
  return <p>PaletteSelector</p>;
}

const layerConfig = {
  title: 'Store types',
  visible: true,
  opacity: 1,
  showOpacityControl: true,
  options: [LAYER_OPTIONS.PALETTE_SELECTOR],
  legend: {
    attr: 'storetype',
    type: LEGEND_TYPES.CATEGORY,
    labels: ['category1', 'category2', 'other'],
    colors: [
      [80, 20, 85],
      [128, 186, 90],
      [231, 63, 116]
    ]
  }
};

const LEGEND_LAYERS = [layerConfig];

describe('LegendWidgetUI', () => {
  test('custom layer options', () => {
    render(
      <LegendWidgetUI
        layers={LEGEND_LAYERS}
        customLayerOptions={LAYER_OPTIONS_COMPONENTS}
      />
    );
    expect(screen.queryByText('PaletteSelector')).toBeInTheDocument();
  });
});
