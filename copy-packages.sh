#!/bin/bash

if [ -z "$1" ]; then
  echo "Missing target directory. Usage: $0 <target_dir>"
  exit 1
fi

SOURCE_DIR="packages"
TARGET_DIR="$1"

for dir in "$SOURCE_DIR"/*; do
  if [ -d "$dir" ]; then
    DIR_NAME=$(basename "$dir")

    SOURCE_PATH="$dir/dist"
    TARGET_PATH="$TARGET_DIR/$DIR_NAME"

    echo "Copying $SOURCE_PATH to $TARGET_PATH"
    cp -r "$SOURCE_PATH" "$TARGET_PATH"
  fi
done

echo "All directories copied successfully!"