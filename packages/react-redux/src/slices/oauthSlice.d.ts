import { OauthApp } from '@carto/react-auth/';
import { InitialOauthState, Reducer } from '../types';

export function createOauthCartoSlice(initialState: InitialOauthState): Reducer;

export function setOAuthApp(arg: OauthApp): { type: 'carto/setOAuthApp', payload: OauthApp };

type OauthParams = {
  accessToken: string,
  expirationDate: string,
  userInfoUrl: string
}

type OauthError = {
  error: string,
  errorDescription: string
}

export function setTokenAndUserInfo(payload: OauthParams | OauthError): { type: 'carto/setTokenAndUserInfo', payload: OauthParams | OauthError };

export const setTokenAndUserInfoAsyn: Function;

export function logout(): { type: 'oauth/logout', payload: {} };

export const selectOAuthCredentials: Function;