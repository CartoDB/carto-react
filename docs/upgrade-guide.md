# Upgrade Guide

## Upgrading from @carto/react v1.0 to v1.1

### executeSQL parameters via destructuring 

ExecuteSQL parameters are passed using object destructuring.

```javascript
executeSQL({ credentials, query })
```

### Credentials apiVersion

A new parameters is included in cartoSlice

```javascript
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
