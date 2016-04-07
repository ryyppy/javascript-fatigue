#!/usr/bin/env bash

echo "Init package.json..."
npm init -y

mkdir -p src test interfaces

echo "Install babel, eslint, flow, tape..."
npm install --save-dev babel babel-core babel-eslint babel-plugin-transform-flow-strip-types babel-preset-es2015 eslint eslint-plugin-flow-vars eslint-config-airbnb eslint-plugin-react babel-cli tape

echo "DONE! Hopefully everything is fine?"


