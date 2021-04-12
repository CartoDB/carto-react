export enum CartoBasemapsNames {
  POSITRON = 'positron',
  VOYAGER = 'voyager',
  DARK_MATTER = 'dark-matter'
}

declare enum CartoUrlBasemaps {
  POSITRON = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  VOYAGER = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  DARK_MATTER = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
}

export enum GMapsBasemapsNames {
  ROADMAP = 'roadmap',
  SATELLITE = 'satellite',
  HYBRID = 'hybrid'
}

export const POSITRON: CartoBasemapsNames.POSITRON;
export const VOYAGER: CartoBasemapsNames.VOYAGER;
export const DARK_MATTER: CartoBasemapsNames.DARK_MATTER;
export const GOOGLE_ROADMAP: GMapsBasemapsNames.ROADMAP;
export const GOOGLE_SATELLITE: GMapsBasemapsNames.SATELLITE;
export const GOOGLE_HYBRID: GMapsBasemapsNames.HYBRID;

type CartoBasemaps = {
  [B in CartoBasemapsNames]: {
    type: 'mapbox',
    options: {
      mapStyle: CartoUrlBasemaps
    }
  }
}

type GMapsBasemaps = {
  [B in GMapsBasemapsNames]: {
    type: 'gmaps',
    options: {
      mapTypeId: GMapsBasemapsNames
    }
  }
}

export const BASEMAPS: CartoBasemaps & GMapsBasemaps;