# Developers

This is a monorepo, made with lerna and yarn workspaces.

Install lerna globally as a first step, if you don't have it already available

```
  yarn global add lerna
```

Clone and execute 
```
  yarn
```

From now on, use one of the root level commands, that lerna will execute for all internal packages, like for example:
```
    yarn build
    yarn test
```

If you have issues, you can always run `yarn test:clean`. It will perform a clean and then ensure that full install, build and test work fine
