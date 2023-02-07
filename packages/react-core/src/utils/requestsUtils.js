/**
 * Threshold to use GET requests, vs POST
 */
export const REQUEST_GET_MAX_URL_LENGTH = 2048;

/**
 * Simple GET request
 */
export function getRequest(url, opts, headers = {}) {
  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers
    },
    ...opts
  });
}

/**
 * Simple POST request
 */
export function postRequest(url, payload, opts, headers = {}) {
  return new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(payload),
    ...opts
  });
}

/**
 * Simple encode parameter
 */
export function encodeParameter(name, value) {
  return `${name}=${encodeURIComponent(value)}`;
}
