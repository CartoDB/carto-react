import { SourceProps, LayerConfig, UseCartoLayerFilterProps } from '../types';

interface UseCartoLayerProps {
  source: SourceProps;
  layerConfig?: LayerConfig;
  uniqueIdProperty?: string;
  viewportFeatures?: boolean;
}

export default function useCartoLayerProps(
  props: UseCartoLayerProps
): UseCartoLayerFilterProps;
