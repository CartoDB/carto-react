# Upgrade Guide

## Upgrading from @carto/react v1.0 to v1.1

### executeSQL parameters via destructuring 

ExecuteSQL parameters are passed using object destructuring.

```javascript
executeSQL({ credentials, query })
```

### Credentials apiVersion

A new `apiVersion` parameter is included in cartoSlice to indicate the CARTO API to be used.

```javascript
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  ...
  ,
  credentials: {
    apiVersion: API_VERSIONS.V2,
    ...
  }
  ...
}
```
