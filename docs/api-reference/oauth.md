# OAuth

OAuth functions and hook

<dl>
<dt><a href="#module_OAuthCallback">OAuthCallback</a></dt>
<dd><p>Component to attend OAuth callbacks on /oauthCallback</p>
</dd>
<dt><a href="#module_OAuthLogin">OAuthLogin</a></dt>
<dd><p>Shows a login button.
When this button is clicked, the OAuth protocol flow is handled
by the <code>useOAuthLogin</code> hook.</p>
</dd>
<dt><a href="#module_useOAuthLogin">useOAuthLogin</a> ⇒ <code>function</code></dt>
<dd><p>Hook to perform login against CARTO using OAuth implicit flow using a popup</p>
</dd>
</dl>

<a name="module_OAuthCallback"></a>

## OAuthCallback
Component to attend OAuth callbacks on /oauthCallback

**Kind**: global function  

<a name="module_OAuthLogin"></a>

## OAuthLogin
Shows a login button.
When this button is clicked, the OAuth protocol flow is handled
by the `useOAuthLogin` hook.

**Kind**: global function  

<a name="module_useOAuthLogin"></a>

## useOAuthLogin ⇒ <code>function</code>
Hook to perform login against CARTO using OAuth implicit flow using a popup

**Kind**: global function  
**Returns**: <code>function</code> - Function to trigger oauth with a popup  

| Param | Type | Description |
| --- | --- | --- |
| oauthApp | <code>Object</code> | OAuth parameters |
| oauthApp.clientId | <code>string</code> | Application client ID |
| oauthApp.scopes | <code>Array.&lt;string&gt;</code> | Scopes to request |
| oauthApp.authorizeEndPoint | <code>string</code> | Authorization endpoint |
| onParamsRefreshed | <code>function</code> | Function to call when params are refreshed |


