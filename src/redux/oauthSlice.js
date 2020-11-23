import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

/**
*
* A function that accepts an initialState, setup the state and creates 
* reducers to manage OAuth with CARTO platform.
* 
* export const oauthInitialState = {
*   oauthApp: {
*     clientId: 'CARTO OAUTH APP clienID'
*     scopes: [
*       'user:profile', // to load avatar photo
*       'datasets:metadata', // to list all your datasets,
*       'dataservices:geocoding', // to use geocoding through Data Services API
*       'dataservices:isolines', // to launch isochrones or isodistances through Data Services API
*     ],
*     authorizeEndPoint: 'https://carto.com/oauth2/authorize', 
*   }
* };
** param  {object} initialState - the initial state of the state
*/
export const createOauthCartoSlice = (initialState) => {
  const state = loadOAuthState(initialState);

  const slice = createSlice({
    name: 'oauth',
    initialState: {
      token: null,
      userInfo: null,
      ...state,
    },
    reducers: {
      setOAuthApp: (state, action) => {
        const oauthApp = action.payload;
        state.oauthApp = { ...state.oauthApp, ...oauthApp };
      },
      setTokenAndUserInfo: (state, action) => {
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;

        saveOAuthState(state);
      },
      logout: (state) => {
        state.token = null;
        state.userInfo = null;
        saveOAuthState(state);
      },
    },
  });

  return slice.reducer;
};

/**
 * Action to set the OAuthApp
 * @param {string} clientId - unique OAuth App identifier
 * @param {array} scopes - array of valid scopes for the App.
 * @param {string} authorizeEndPoint - URL of CARTO authorization endpoint. Except for on-premise, it should be 'https://carto.com/oauth2/authorize'
 */
export const setOAuthApp = ({clientId, scopes, authorizeEndPoint}) => ({ type: 'oauth/setOAuthApp', payload: {clientId, scopes, authorizeEndPoint}});

/**
 * Action to setTokenAndUserInfo at the store. Typically after a token is retrieved.
 * @param {Object} payload 
 */
export const setTokenAndUserInfo = (payload) => ({
  type: 'oauth/setTokenAndUserInfo',
  payload,
});

/**
 *  Action to get the userInfo once there is a valid token, and set them both into state
 * */ 
export const setTokenAndUserInfoAsync = createAsyncThunk(
  'oauth/setTokenAndUserInfo',
  async (token, thunkApi) => {
    const { userInfoUrl, accessToken } = token;
    const meUrl = `${userInfoUrl}?api_key=${accessToken}`;
    const userInfo = await (await fetch(meUrl)).json();

    thunkApi.dispatch(setTokenAndUserInfo({ token, userInfo }));
  }
);

/**
 * Action to logout an user
 */
export const logout = () => ({ type: 'oauth/logout', payload: {} });


// Get the credentials, from curren token & userInfo
const selectToken = (state) => state.oauth.token;
const selectUserInfo = (state) => state.oauth.userInfo;

/**
 * Selector to fetch the current OAuth credentials from the store
 */
export const selectOAuthCredentials = createSelector(
  [selectToken, selectUserInfo],
  (token, userInfo) => {
    if (!token || !userInfo) return null;

    const serverUrl = userInfo.api_endpoints.auth;
    const serverUrlTemplate = serverUrl.replace(userInfo.username, '{user}');

    const credentials = {
      username: userInfo.username,
      apiKey: token.accessToken,
      serverUrlTemplate,
    };
    return credentials;
  }
);

/**
 * Set up initial OAuth state, loading values from localStorage if they were
 * stored in a previous session.
 */
function loadOAuthState(oauthInitialState) {
  let serializedState;
  try {
    const storedConfig = JSON.parse(localStorage.getItem('cra-carto'));
    const { token, userInfo } = storedConfig;

    if (token.expirationDate < Date.now()) {
      throw new Error('Found expired token in localStorage, resetting...');
    }
    serializedState = { token, userInfo };
  } catch (err) {
    serializedState = {};
  }

  const initialState = Object.assign(oauthInitialState, serializedState);
  return initialState;
}

/**
 * Persist partial OAuth state to localStorage, to allow recovering on
 * a new load
 */
function saveOAuthState(oauth) {
  try {
    const { token, userInfo } = oauth;

    if (token === null || userInfo === null) {
      localStorage.removeItem('cra-carto');
      return;
    }

    localStorage.setItem('cra-carto', JSON.stringify({ token, userInfo }));
  } catch {
    // ignore write errors
  }
}
