#!/bin/bash

FILES=${{ inputs.who-to-greet }}

IFS=' ' read -ra array <<< "$FILES"
for i in "${array[@]}"
do
  echo 'Downloading' $i'...'
  curl https://raw.githubusercontent.com/"$GITHUB_REPOSITORY"/master/"$i" -s -o "$i"
done
