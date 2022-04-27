// Geocoding / Data Services https://carto.com/developers/data-services-api/reference/

import { executeSQL, ldsGeocode } from '@carto/react-api';
import { API_VERSIONS } from '@deck.gl/carto';

/**
 * Street-Level Geocoder.
 *
 * Geocode street given as address and optionally county into geo location (latitude, longitute).
 * Only first result is returned.
 *
 * Method:
 *  * `sql` default for Carto v2 credentials, execute `ST_AsGeoJSON` against connection specified in credentials
 *  * `lds` default for Carto v3 credentials, execute query against Carto Location Data Services
 *
 * @param {object} credentials
 * @param { object } props
 * @param { string= } props.method - method, either `sql` or `lds`
 * @param { string } props.searchText - searched address to be executed
 * @param { string= } props.country - optional, limit search scope to country as ISO-3166 alpha-2 code, example, ES, DE
 * @param { string= } props.state - optional, limit search scope to state (only V2 api)
 * @param { string= } props.city - optional, limit search scope to city (only V2 api)
 * @param { number= } props.limit - optional, limit of answers
 */
export const geocodeStreetPoint = async (credentials, props, opts = {}) => {
  const { searchText, city, state, country } = props;
  if (
    props.method === 'lds' ||
    (!props.method && credentials.apiVersion === API_VERSIONS.V3)
  ) {
    return geocodeStreetPointLds(credentials, { searchText, country }, opts);
  }

  return geocodeStreetPointSql(credentials, { searchText, city, state, country }, opts);
};

export const geocodeStreetPointLds = async (
  credentials,
  { searchText, country },
  opts = {}
) => {
  const results = await ldsGeocode({
    credentials,
    address: searchText,
    country,
    limit: 1,
    opts
  });

  return results?.[0];
};

export const geocodeStreetPointSql = async (
  credentials,
  { searchText, city, state, country },
  opts = {}
) => {
  if (credentials.apiKey === 'default_public') {
    throw new Error('To search a location you need to login or provide an API KEY');
  }

  const query = `SELECT ST_AsGeoJSON(cdb_geocode_street_point('${searchText}', '${
    city ?? ''
  }', '${state ?? ''}', '${country ?? ''}')) AS geometry`;
  const results = await executeSQL({ credentials, query, opts });

  const geometry = JSON.parse(results[0].geometry);
  if (geometry === null) return null;

  // Just 1 result is returned, with geometry value on success
  const [longitude, latitude] = geometry.coordinates;
  return {
    longitude,
    latitude
  };
};

// OTHER GEOCODING OPTIONS:
//      Country Geocoder: cdb_geocode_admin0polygon(_country_name text)
//      Level-1 Administrative Regions Geocoder: cdb_geocode_admin1polygon(_admin1_name text)
//      City Geocoder: cdb_geocode_namedplace_point(city_name text)
//      Postal Code Geocoder: cdb_geocode_postalcode_point(code text, country_name text)
//      IP Addresses Geocoder: cdb_geocode_ipaddress_point(ip_address text)
