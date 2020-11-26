import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Hidden, IconButton } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import useOAuthLogin from './useOAuthLogin';
import { setTokenAndUserInfoAsync } from '../redux/oauthSlice';

/** 
 * Shows a login button.
 * When this button is clicked, the OAuth protocol flow is handled
 * by the `useOAuthLogin` hook.
 * 
 * @exports OAuthLogin
 */
export default function OAuthLogin() {
  const dispatch = useDispatch();
  const oauthApp = useSelector((state) => state.oauth.oauthApp);

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      // TODO: Catch error
      throw new Error(oauthParams.error);
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  return (
    <React.Fragment>
      <Hidden xsDown>
        <Button color="inherit" variant="outlined" onClick={handleLogin}>
          Login
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton color="inherit" aria-label="Login" onClick={handleLogin}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Hidden>
    </React.Fragment>
  );
}
