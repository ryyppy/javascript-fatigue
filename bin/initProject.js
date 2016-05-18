#!/usr/bin/env babel-node

/* @flow */
/* eslint-disable no-console */


const execSync = require('child_process').execSync;

const path = require('path');
const fs = require('fs');
const mkdirSync = fs.mkdirSync;

const PWD = process.env.PWD;

const TEMPLATES = path.join(__dirname, '..', 'templates');
const BABEL_RC = path.join(TEMPLATES, 'babelrc');
const FLOWCONFIG = path.join(TEMPLATES, 'flowconfig');
const ESLINTRC = path.join(TEMPLATES, 'eslintrc');

const NPM_INSTALL = 'npm install --save-dev babel babel-core babel-eslint babel-plugin-transform-flow-strip-types babel-preset-es2015 eslint eslint-plugin-flow-vars eslint-config-airbnb eslint-plugin-react babel-cli tape'; //eslint-disable-line
const NPM_INIT = 'npm init -y';

function doExec(command: string, preMessage: string, withEcho: boolean = true): void {
  console.log(preMessage);

  const output = execSync(command, { encoding: 'utf8' });

  if (withEcho) {
    console.log(output);
  }
}

function doesExist(dirOrFile: string): boolean {
  try {
    fs.statSync(dirOrFile);
    return true;
  } catch (e) {
    return false;
  }
}

function copyFile(source: string, target: string, preMessage: string): void {
  console.log(preMessage);
  const content = fs.readFileSync(source, 'utf8');

  try {
    fs.statSync(target);
    console.log(`File ${target} does already exist. Skipped...`);
  } catch (e) {
    // Doesn't exist
    fs.writeFileSync(target, content, 'utf8');
  }
}

function createDir(relativeDir) {
  const dir = path.join(PWD, relativeDir);
  try {
    console.log(`Creating dir ./${relativeDir}`);
    mkdirSync(dir);
  } catch (e) {
    console.log(`Directory ${dir} seems to exist already. Skipped...`);
  }
}

// NPM stuff
if (!doesExist(path.join(PWD, 'package.json'))) {
  doExec(NPM_INIT, 'Initialize package.json...');
}
doExec(NPM_INSTALL, 'Install babel, eslint, flow, tape... (will take some time)');

// Create directory structure
createDir('src');
createDir('test');
createDir('interfaces');
createDir('definitions');

// Config file copying
copyFile(BABEL_RC, path.join(PWD, '.babelrc'), 'Creating .babelrc ...');
copyFile(FLOWCONFIG, path.join(PWD, '.flowconfig'), 'Creating .flowconfig ...');
copyFile(ESLINTRC, path.join(PWD, '.eslintrc'), 'Creating .eslintrc ...');
