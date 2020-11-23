# OAuth
OAuth functions and hook

## OAuthCallback
Component to attend OAuth callbacks on /oauthCallback

## OAuthLogin
Shows a login button.
When this button is clicked, the OAuth protocol flow is handled
by the `useOAuthLogin` hook.

## useOAuthLogin ⇒ <code>function</code>
Hook to perform login against CARTO using OAuth implicit flow using a popup

**Returns**: <code>function</code> - Function to trigger oauth with a popup  

| Param | Type | Description |
| --- | --- | --- |
| oauthApp | <code>Object</code> | OAuth parameters |
| oauthApp.clientId | <code>string</code> | Application client ID |
| oauthApp.scopes | <code>Array.&lt;string&gt;</code> | Scopes to request |
| oauthApp.authorizeEndPoint | <code>string</code> | Authorization endpoint |
| onParamsRefreshed | <code>function</code> | Function to call when params are refreshed |
