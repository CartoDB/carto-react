import { SourceProps, UseCartoLayerFilterProps } from '../types';

export default function useCartoLayerProps(
  source: SourceProps & { id: string },
  uniqueIdProperty?: string
): UseCartoLayerFilterProps