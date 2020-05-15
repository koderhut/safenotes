#!/bin/bash

set -e

SCRIPTPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PROJECTROOT="${SCRIPTPATH}/../"
CLEANUP='public/env.js.dist '

echo "Cleaning app...";
for fl in $CLEANUP ; do
  echo "Removing: ${PROJECTROOT}$fl";
  rm -rf "${PROJECTROOT}$fl"
done


