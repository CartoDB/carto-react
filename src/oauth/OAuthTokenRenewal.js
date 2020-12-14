import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setError, setTokenAndUserInfoAsync } from 'config/oauthSlice';
import { buildTokenRenewalUrl, getOAuthParamsFromCallback } from './oauthHelper';

const MAX_ATTEMPTS = 20;

/**
 * Component to perform a silent OAuth token renewal
 */
export default function OAuthTokenRenewal() {
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const token = useSelector((state) => state.oauth.token);

  const dispatch = useDispatch();

  const [isRenewing, setIsRenewing] = useState(false);
  // const [tokenWillExpireSoon, setTokenWillExpireSoon] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const intervalRef = useRef();
  const iframeRef = useRef();
  // const containerRef = useRef();

  const programNextTokenCheck = () => {
    console.log('programNextTokenCheck');

    const ONE_MINUTE = 60000; // 
    intervalRef.current = setInterval(tokenCheck, ONE_MINUTE);
  };

  const tokenCheck = () => {
    console.log('tokenCheck');

    // debugger;
    let now = new Date();
    now.setMinutes(now.getMinutes() + 59); // TODO
    const inFiveMinutes = new Date(now);
    const expiration = new Date(token.expirationDate);

    console.log(expiration - inFiveMinutes);
    const tokenWillExpireSoon = token && (expiration < inFiveMinutes);

    // const willExpireSoon = Boolean(token);
    // setTokenWillExpireSoon(willExpireSoon);
    if (tokenWillExpireSoon && !isRenewing) {
      initTokenRenewal();
    }
    console.log(tokenWillExpireSoon);
  };

  const initTokenRenewal = () => {
    console.log('initTokenRenewal');

    setIsRenewing(true);

    makeSilentRenewal()
      .then((params) => {
        console.log('SUCCESS: ', params);
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      })
      .finally(() => {
        // setIsRenewing(false);
      });
  };

  const makeSilentRenewal = () => {
    console.log('makeSilentRenewal');

    const renewalUrl = buildTokenRenewalUrl(oauthApp, token.state);
    iframeRef.current.src = renewalUrl;

    console.log(renewalUrl);

    return new Promise((resolve, reject) => {
      const checkRedirect = () => {
        console.log('inside checkRedirect...');

        const redirectUrl = iframeRef.current.contentWindow.location.href;
        if (!redirectUrl) {
          setCurrentAttempt((currentAttempt) => currentAttempt + 1);
          if (currentAttempt > MAX_ATTEMPTS) {
            reject({
              error: 'OAuth token renewal failed',
              error_description: 'Silent renewal failed after maximum number of attempts',
            });
            return;
          }
          setTimeout(() => checkRedirect(), 1000); // 500
          return;
        }

        // iframeRef.current.src = renewalUrl;

        // At this point, silent renewal worked as expected
        const params = getOAuthParamsFromCallback(redirectUrl);
        resolve(params);
      };

      checkRedirect();
    });
  };

  const clearTimer = () => {
    console.log('clearTimer');
    window.clearInterval(intervalRef.current);
  };

  //   const silentRenewal = () => {
  //     console.log('silentRenewal');
  //     return new Promise((resolve, reject) => {
  //       const checkRedirect = () => {
  //         const redirectUrl = iframeRef.current.contentWindow.location;
  //         if (!redirectUrl) {
  //           setTimeout(() => checkRedirect(), 5000);
  //           return;
  //         }
  //       };
  //     });
  //     // return new Promise((resolve, reject) => {
  //     //   const checkRedirect = () => {
  //     //     const redirectUrl = iframeRef.current.contentWindow.location.href;
  //     //     console.log(redirectUrl);
  //     //     if (!redirectUrl) {
  //     //       setCurrentAttempt((currentAttempt) => currentAttempt + 1);
  //     //       if (currentAttempt > MAX_ATTEMPTS) {
  //     //         reject({
  //     //           error: 'OAuth token renewal failed',
  //     //           error_description: 'Silent renewal failed after maximum number of attempts',
  //     //         });
  //     //         return;
  //     //       }
  //     //       setTimeout(() => checkRedirect(), 500);
  //     //       return;
  //     //     }
  //     //     // iframeRef.current.src = buildTokenRenewalUrl(oauthApp);

  //     //     // Silent renewal worked as expected, let's update the oauth info
  //     //     const params = getOAuthParamsFromCallback(redirectUrl);
  //     //     resolve(params);
  //     //   };

  //     //   checkRedirect();
  //     // });
  //   };

  const handleOnLoad = () => {
    console.log('handleOnLoad');
    // debugger;
    // const redirectUrl = iframeRef.current.contentWindow.location.href;
    // console.log(redirectUrl);
    // silentRenewal().then((params) => {
    //   console.log(params);
    // });
    // silentRenewal()
    //   .then((params) => {
    //     // save params
    //     if (params.error) {
    //       dispatch(setError(params));
    //     } else {
    //       dispatch(setTokenAndUserInfoAsync(params));
    //     }

    //     // clean up
    //     setIsRenewing(false);
    //     setCurrentAttempt(0);
    //     programNextTokenCheck();
    //     // Access token was renewed silently.
    //   })
    //   .catch((renewalError) => {
    //     dispatch(
    //       setError({
    //         error: 'OAuth token renewal error',
    //         errorDescription: renewalError,
    //       })
    //     );

    //     setIsRenewing(false);
    //   });
  };

  // useEffect(() => {
  //   console.log('useEffect 1');
  //   const THIRTY_SECONDS = 10000;
  //   // TODO
  //   intervalRef.current = setInterval(tokenCheck, THIRTY_SECONDS);

  //   return clearTimer;
  // });

  // useEffect(() => {
  //   console.log('useEffect 2');
  //   if (tokenWillExpireSoon && !isRenewing) {
  //     setIsRenewing(true);
  //     clearTimer();
  //     const renewalUrl = buildTokenRenewalUrl(oauthApp);
  //     iframeRef.current.src = renewalUrl;
  //   }
  // }, [tokenWillExpireSoon, isRenewing, oauthApp]);

  //   useEffect(() => {
  //     const renewalUrl = buildTokenRenewalUrl(oauthApp);

  //     const iframe = document.createElement('iframe');
  //     iframe.width = 0;
  //     iframe.height = 0;
  //     iframe.display = 'none';
  //     iframe.addEventListener('load', handleOnLoad);
  //     iframe.src = renewalUrl;
  //     containerRef.current.appendChild(iframe);
  //     iframeRef.current = iframe;
  //   });


  useEffect(() => {
    if (token) {
      programNextTokenCheck();
    }
    return clearTimer;
  }, [token]);

  useEffect(() => {
    console.warn('useEffect 2');
  });

  if (!oauthApp) {
    return; // no check at all if no OAuthApp has been set
  }

  return (
    // <div ref={containerRef}></div>
    <iframe
      ref={iframeRef}
      src={window.location.href}
      style={{
        // width: 0,
        // height: 0,

        // display: 'none',
        // visibility: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        // src: { renewalUrl },
        width: 300,
        height: 400,
      }}
      width={0}
      height={0}
      title='silent-token-renew'
    ></iframe>
  );
}