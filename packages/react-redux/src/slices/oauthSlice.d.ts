import { OauthApp } from '@carto/react-auth/';
import { InitialOauthState, Reducer } from '../types';

type OauthParams = {
  accessToken: string,
  expirationDate: string,
  userInfoUrl: string
}

type OauthError = {
  error: string,
  errorDescription: string
}

declare enum OauthActions {
  SET_OAUTH_APP = 'carto/setOAuthApp',
  SET_TOKEN_AND_USER_INFO = 'carto/setTokenAndUserInfo',
  LOGOUT = 'oauth/logout'
}

export function createOauthCartoSlice(initialState: InitialOauthState): Reducer;

export function setOAuthApp(arg: OauthApp): {
  type: OauthActions.SET_OAUTH_APP,
  payload: OauthApp
};

export function setTokenAndUserInfo(payload: OauthParams | OauthError): {
  type: OauthActions.SET_TOKEN_AND_USER_INFO,
  payload: OauthParams | OauthError
};

export const setTokenAndUserInfoAsync: Function;

export function logout(): {
  type: OauthActions.LOGOUT,
  payload: {}
};

export const selectOAuthCredentials: Function;