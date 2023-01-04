import React, { useEffect, useRef } from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { debounce } from '@carto/react-core';

/**
 * React component for working with Google Maps API and deck.gl
 *
 * @param { Object } props - Properties
 * @param { Object } props.basemap - basemap
 * @param { Object } props.basemap.options - *MapOptions* as defined by https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 * @param { Object } props.viewState - Viewstate, as defined by deck.gl. Just center and zoom level are supported
 * @param { Layer[] } props.layers - deck.gl layers array
 * @param { function } props.getTooltip - (Optional) Tooltip handler
 * @param { function } props.onResize - (Optional) onResize handler
 * @param { function } props.onViewStateChange - (Optional) onViewStateChange handler
 * @param { string } props.apiKey - Google Maps API Key
 * @param { string } props.mapId - Google Maps custom mapId
 * @param { string } props.customVersion - (Optional) Google Maps custom version, that will be specified at url level. Eg: if customVersion === 'beta' it will use internally this: https://maps.google.com/maps/api/js?v=beta
 * @returns { JSX.Element } - Data returned from the SQL query execution
 */
export function GoogleMap(props) {
  const {
    basemap,
    viewState,
    layers,
    getTooltip,
    onResize,
    onViewStateChange,
    apiKey,
    mapId,
    customVersion = ''
  } = props;
  // based on https://publiuslogic.com/blog/google-maps+react-hooks/
  const containerRef = useRef();
  const triggerResize = (map) => {
    window.google.maps.event.trigger(map, 'resize');
  };

  const customStyle = props.style || {};

  let containerStyle = {
    position: 'absolute',
    zIndex: 0,
    left: 0,
    top: 0,
    width: props.width || '100%',
    height: props.height || '100%',
    ...customStyle
  };

  const onLoad = () => {
    // gmaps
    let options = {
      center: {
        lat: viewState.latitude,
        lng: viewState.longitude
      },
      mapTypeControl: false,
      heading: viewState.bearing,
      tilt: viewState.pitch,
      zoom: viewState.zoom + 1, // notice the 1 zoom level difference relative to deckgl
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
      mapId,
      ...basemap.options
    };

    const mapNotConnected = containerRef.current.children.length === 0;
    if (!window.cartoGmap || mapNotConnected) {
      const map = new window.google.maps.Map(containerRef.current, options);
      const deckOverlay = new GoogleMapsOverlay({ getTooltip });

      const handleViewportChange = () => {
        const center = map.getCenter();
        // adapted to common Deck viewState format
        const newViewState = {
          longitude: center.lng(),
          latitude: center.lat(),
          zoom: Math.max(map.getZoom() - 1, 1), // cap min zoom level to 1
          pitch: map.getTilt(),
          bearing: map.getHeading()
        };

        if (JSON.stringify(window.cartoViewState) !== JSON.stringify(newViewState)) {
          window.cartoViewState = newViewState;
          onViewStateChange && props.onViewStateChange({ viewState: newViewState });
        }
      };

      const handleViewportChangeDebounced = debounce(handleViewportChange, 200);
      map.addListener('bounds_changed', handleViewportChangeDebounced);
      map.addListener('resize', () => {
        onResize &&
          onResize({
            height: map.getDiv().offsetHeight,
            width: map.getDiv().offsetWidth
          });
      });

      window.onresize = () => {
        triggerResize(map);
      };

      triggerResize(map);

      window.cartoGmap = map;
      window.cartoDeck = deckOverlay;
      window.cartoDeck.setMap(window.cartoGmap);
    } else {
      const { center, heading, tilt, zoom, ...rest } = options;
      const newViewState = {
        longitude: center.lng,
        latitude: center.lat,
        zoom: zoom - 1,
        pitch: tilt,
        bearing: heading
      };
      if (JSON.stringify(window.cartoViewState) !== JSON.stringify(newViewState)) {
        window.cartoGmap.setCenter(center);
        window.cartoGmap.setHeading(heading);
        window.cartoGmap.setTilt(tilt);
        window.cartoGmap.setZoom(zoom);
      }
      window.cartoGmap.setOptions(rest);
      window.cartoDeck.setProps({ getTooltip });
    }
  };

  // Set layers should be outside of the useEffect to avoid problems with layers that changes
  // dinamically with move events like the FeatureSelectionLayer
  if (window.cartoDeck) {
    window.cartoDeck.setProps({ layers });
  }

  useEffect(() => {
    if (!document.querySelector('#gmaps')) {
      const script = document.createElement(`script`);
      script.id = 'gmaps';
      script.async = true;
      script.type = `text/javascript`;

      let url = `https://maps.google.com/maps/api/js?key=${apiKey}`;
      if (customVersion) url = `${url}&v=${customVersion}`;
      script.src = url;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
    } else if (document.querySelector('#gmaps') && window.google) {
      onLoad();
    }
  });

  return <div ref={containerRef} style={containerStyle}></div>;
}
