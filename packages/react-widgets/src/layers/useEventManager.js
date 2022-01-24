import { EventManager } from 'mjolnir.js';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BASEMAPS } from '@carto/react-basemaps/';
import { FEATURE_SELECTION_MODES } from '@carto/react-core/';

// When we're using Google as a base map, Nebula layer doesn't work becase Nebula uses the Deck Gl eventManager
// so in this case we're defining a new EventManager with the Google maps div. On the other hand, in Builder
// we don't use the c4r GoogleMap component so we need to send a EventManager as parameter
export default function useEventManager({
  eventManager,
  isEdit,
  isSelected,
  selectedMode
}) {
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');
  const cartoGmap = window.cartoGmap;

  const customEventManager = useMemo(() => {
    if (eventManager) {
      return eventManager;
    }

    if (isGmaps && cartoGmap) {
      return new EventManager(cartoGmap.getDiv());
    }
    // If Google is not the base map we use the default Nebula EventManager
    return undefined;
  }, [cartoGmap, eventManager, isGmaps]);

  // Disable the map interactivity if we're using Google as a base map and we're editing
  // the geometry or drawing a lasso. Nebula does it automatically when the base map is not Google
  useEffect(() => {
    if (isGmaps && cartoGmap) {
      const disableDragAndDrop =
        (isEdit && isSelected) || selectedMode === FEATURE_SELECTION_MODES.LASSO_TOOL;
      cartoGmap.setOptions({ gestureHandling: disableDragAndDrop ? 'none' : 'auto' });
    }
  }, [cartoGmap, isEdit, isGmaps, isSelected, selectedMode]);

  return customEventManager;
}
