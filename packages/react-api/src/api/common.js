/**
 * Return more descriptive error from API
 */
export function dealWithApiError({ response, data }) {
  switch (response.status) {
    case 401:
      throw new Error('Unauthorized access. Invalid credentials');
    case 403:
      throw new Error('Forbidden access to the requested data');
    default:
      throw new Error(`${JSON.stringify(data?.hint || data.error?.[0])}`);
  }
}

export function checkCredentials(credentials) {
  if (!credentials || !credentials.apiBaseUrl || !credentials.accessToken) {
    throw new Error('Missing or bad credentials provided');
  }
}
