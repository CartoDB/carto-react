# Developers

This is a monorepo, made with lerna and yarn workspaces.

Clone and execute 
```
  yarn
```

From now on, use one of the root level commands, that lerna will execute for all internal packages, like for example:
```
  yarn build
  yarn test
```

If you have issues, you can always run `yarn build:full`. It will perform a full clean and then ensure that install, build and test work fine

## Link from carto-react-template
If you want to link these packages to the templates repo, build & then execute here
```
  yarn
```
