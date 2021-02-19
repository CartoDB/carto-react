import { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeatures, setAllWidgetsLoadingState } from '../redux/cartoSlice';
import { debounce } from '../utils/debounce';
import { viewportFeatures } from './viewportFeatures';
import viewportFeaturesWorker from '../workers/viewportFeatures.worker';

// import { binaryToGeoJson, geojsonToBinary } from '@loaders.gl/gis';
import { getTransferList } from '@loaders.gl/loader-utils/src/lib/worker-utils/get-transfer-list';

export default function useViewportFeatures(
  source,
  uniqueIdProperty,
  debounceTimeOut = 500
) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [tiles, setTiles] = useState([]);
  const worker = useMemo(() => new viewportFeaturesWorker(), []);
  // const worker_2 = useMemo(() => new viewportFeaturesWorker(), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeFeatures = useCallback(
    debounce(({ tiles, viewport, uniqueIdProperty, sourceId }) => {
      const tilesCleaned = tiles.map(({ data, isVisible, bbox }) => ({
        data,
        isVisible,
        bbox
      }));
      // const transferList = getTransferList(tilesCleaned)

      // var data = new Uint8Array(500 * 1024 * 1024);
      // var arr = [];
      // var bufferArr = [];
      // for (var i = 0; i < 8000; i++) {
      //     arr[i] = new Float32Array(100);

      //     bufferArr.push(arr[i].buffer);

      // }
      // var init = (new Date()).getTime();
      worker.postMessage({
        tiles: tilesCleaned,
        viewport,
        uniqueIdProperty
      });
      // worker.postMessage(arr);
      // var end = (new Date()).getTime();
      // console.log(`No transferible: ${end - init}`);

      // var init2 = (new Date()).getTime();
      // worker_2.postMessage({
      //   tiles: tilesCleaned,
      //   viewport,
      //   uniqueIdProperty
      // }, transferList);
      // // worker_2.postMessage(arr, bufferArr);
      // var end2 = (new Date()).getTime();
      // console.log(`Transferible: ${end2 - init2}, buffer size: ${transferList.length}`);

      worker.onmessage = ({ data: { features } }) => {
        dispatch(
          setViewportFeatures({
            sourceId,
            features: features
          })
        );
      };

      // const features = viewportFeatures({ tiles, viewport, uniqueIdProperty });

      // dispatch(
      //   setViewportFeatures({
      //     sourceId,
      //     features: features
      //   })
      // );
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

  useEffect(() => {
    return () => {
      worker.terminate();
    };
  }, [worker]);

  return [onViewportLoad];
}
