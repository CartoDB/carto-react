# Developers

This is a monorepo, made with lerna and yarn workspaces. We recommend node version >=14.X

Clone and execute

```
  yarn
```

From now on, use one of the root level commands, that lerna will execute for all internal packages, like for example:

```
  yarn build
  yarn test
```

If you have issues, you can always run `yarn build:clean`. It will perform a full clean and then ensure that install, build and test work fine

## Link from carto-react-template

If you want to link these packages to the templates repo, build & then execute here

```
  yarn link-all
```

Then, inside the proper template folder in carto-react-template, link packages with:

```
  yarn link-carto-react
```

## npm release

You will need npm credentials under @carto organization.

### To make a **prerelease**:

1. Create a new branch from master, named after the new version (eg, if current version is v1.0.0-rc.2, `git checkout -b release-1.0.0-rc.3`)
2. Modify the changelog, creating a new entry with current contents from `Not released` for the new release; eg: `## 1.0.0-rc.3 (2021-03-22)`. Keep 'Not released' header for the future work, and commit it to the new branch
3. Push that branch upstream, with something like `git push --set-upstream origin v1.0.0-rc.3`
4. Open a PR, with for eg.: `https://github.com/CartoDB/carto-react/pull/new/v1.0.0-rc.3`
5. Ask your peers for revision
6. Ensure current versions in package.json files are ok (eg. not 1 package with rc.2 and another one with rc.3, also in internal dependencies & peerdependencies among packages). The effective bump will be done with lerna in a step later (so we're talking just about dependencies, not the main 'version' field in packages).
7. Once it's ok execute locally `yarn publish:prerelease`
8. Choose `Custom prerelease` and ensure the packages version proposed is correct (eg. change suffix to 'alpha' or 'beta', instead of 'rc' if required)
9. Once the npm package has been published, `Merge the PR` to master from github
10. Update the storybook (if required)
11. Coordinate with the design team on minor and major bump versions. C4R and Design system library must have the same paired version.

### To make an official **release**:

1. Repeat the same steps as in a prerelease, but executing `yarn publish:release`

### To apply a hotfix patch

- If change also applies to current master, it's recommended to start by creating a PR applying the fix it (to avoid forgetting it).
- Then create a branch for the patch release, but this time start with the desired (usually stable) branch. For example, to create a patch 1.4.8, while not affecting current master, do `git checkout -b release-v1.4.8 release-v1.4.7`. Then apply there, locally, all changes as needed. If you created a first PR for master, you can use cherry-pick to share changes among master & patch.
- After having everything ready, go as usual, with changelog entry + `yarn publish:release`

## Firebase deployment of storybook

(Restricted to CARTO developers)

@carto/react-ui package includes a storybook with UI components, which latest version is deployed at https://storybook-react.carto.com/

To deploy there a new update:

- Ensure you have the firebase CLI properly (installed and) configured
  ```
    firebase login
  ```
- Execute from root path:
  ```
    yarn storybook:publish
  ```
- That will publish the website to the Google Cloud Firebase project.
