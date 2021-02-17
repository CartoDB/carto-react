import { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeatures, setAllWidgetsLoadingState } from '../redux/cartoSlice';
import { debounce } from '../utils/debounce';
import { viewportFeatures } from './viewportFeatures';
// import viewportFeaturesWorker from '../workers/viewportFeatures.worker'

// import { binaryToGeoJson, geojsonToBinary } from '@loaders.gl/gis';
// import { getTransferList } from '@loaders.gl/loader-utils/src/lib/worker-utils/get-transfer-list'

export default function useViewportFeatures(
  source,
  uniqueIdProperty,
  debounceTimeOut = 500
) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [tiles, setTiles] = useState([]);
  // const worker = useMemo(() => new viewportFeaturesWorker(), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeFeatures = useCallback(
    debounce(({ tiles, viewport, uniqueIdProperty, sourceId }) => {
      // const tilesCleaned = tiles.map(({ data, isVisible, bbox }) => ({ data, isVisible, bbox }))
      // const transferList = getTransferList(tilesCleaned)

      // // worker.postMessage({
      // //   tiles: tilesCleaned,
      // //   viewport,
      // //   uniqueIdProperty
      // // }, transferList);

      // worker.postMessage({
      //   tiles: tilesCleaned,
      //   viewport,
      //   uniqueIdProperty
      // });

      // worker.onmessage = ({ data: { features } }) => {
      //   dispatch(
      //     setViewportFeatures({
      //       sourceId,
      //       features: features
      //     })
      //   );
      // };

      const features = viewportFeatures({ tiles, viewport, uniqueIdProperty });

      dispatch(
        setViewportFeatures({
          sourceId,
          features: features
        })
      );
    }, debounceTimeOut),
    []
  );

  useEffect(() => {
    if (tiles.length && source) {
      dispatch(setAllWidgetsLoadingState(true));
      computeFeatures({ tiles, viewport, uniqueIdProperty, sourceId: source.id });
    }
  }, [tiles, viewport, uniqueIdProperty, computeFeatures, source, dispatch]);

  const onViewportLoad = useCallback((tiles) => {
    setTiles(tiles);
  }, []);

  // useEffect(() => {
  //   return () => {
  //     worker.terminate();
  //   };
  // }, [worker]);

  return [onViewportLoad];
}
