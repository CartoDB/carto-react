#!/usr/bin/env bash

# manually "install" local packages into target workspace

# context
#   - folder: carto react root
#   - yarn build executed previously
#
# example:
#
#   ~/carto/carto-react$ bash ./push-built-packages.sh ../cloud-native/workspace-www
target=$1

for packageName in $(ls -1 packages/) ; do
    packageDir=packages/$packageName
    (cd $packageDir && rm -rf *.tgz && npm pack)
    packageName=$(basename $packageDir)
    targetDir="${target}/node_modules/@carto/${packageName}"
    rm -rf "$targetDir"
    mkdir -p "$targetDir"
    packageFile=$(ls -1 $packageDir/*.tgz)

    echo tar zxf $packageFile -C $targetDir
    tar --strip-components=1 -xvzf $packageFile -C $targetDir package/
done
