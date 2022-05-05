import { checkCredentials, makeCall } from './common';

/**
 * Execute a LDS geocoding service geocode request.
 *
 * @param { object } props
 * @param { string } props.address - searched address to be executed
 * @param { string= } props.country - optional, limit search scope to country as ISO-3166 alpha-2 code, example, ES, DE
 * @param { number= } props.limit - optional, limit of ansewers
 * @param { Object } props.credentials - CARTO user credentials
 * @param { string } props.credentials.accessToken - CARTO 3 access token
 * @param { string } props.credentials.apiBaseUrl - CARTO 3 api server URL
 * @param { Object= } props.opts - Additional options for the HTTP request
 */
export async function ldsGeocode({ credentials, address, country, limit, opts }) {
  checkCredentials(credentials);

  if (!address) {
    throw new Error('ldsGeocode: No address provided');
  }

  const url = new URL(`${credentials.apiBaseUrl}/v3/lds/geocoding/geocode`);
  url.searchParams.set('address', address);
  if (country) {
    url.searchParams.set('country', country);
  }
  if (limit) {
    url.searchParams.set('limit', String(limit));
  }

  let data = await makeCall({ url, credentials, opts });

  if (Array.isArray(data)) {
    data = data[0];
  }

  return data.value;
}
