# Developers

This is a monorepo, made with lerna

Clone and execute

```
    npm install
```
The postinstall will execute lerna bootstrap, with hoisting option, and the project will be ready to work with.


From now on, use one of the root level commands, that lerna will execute for all internal packages, like for example:
```
    npm run build
    npm run test
```

If you have issues, you can always run `npm run test:clean`. It will perform a clean and then ensure that full install, build and test work fine
