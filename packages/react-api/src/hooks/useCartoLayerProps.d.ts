import { SourceProps, UseCartoLayerFilterProps } from '../types';

interface UseCartoLayerProps {
  source: SourceProps & { id: string },
  uniqueIdProperty?: string
  viewportFeatures?: boolean
}

export default function useCartoLayerProps(props: UseCartoLayerProps): UseCartoLayerFilterProps
