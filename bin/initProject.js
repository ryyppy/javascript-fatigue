#!/usr/bin/env node

const execSync = require('child_process').execSync;

const path = require('path');
const fs = require('fs');
const mkdirSync = fs.mkdirSync;

const PWD = process.env.PWD;

const TEMPLATES = path.join(__dirname, '..', 'templates');
const BABEL_RC = path.join(TEMPLATES, 'babelrc');
const FLOWCONFIG = path.join(TEMPLATES, 'flowconfig');
const ESLINTRC = path.join(TEMPLATES, 'eslintrc');

const NPM_INSTALL = 'npm install --save-dev babel babel-core babel-eslint babel-plugin-transform-flow-strip-types babel-preset-es2015 eslint eslint-plugin-flow-vars eslint-config-airbnb eslint-plugin-react babel-cli tape';
const NPM_INIT = 'npm init -y';

function doExec(command, preMessage, withEcho) {
  withEcho = withEcho || true;
  console.log(preMessage);

  const output = execSync(command, { encoding: 'utf8' });

  if (withEcho) {
    console.log(output);
  }
}

function copyFile(source, target, preMessage) {
  console.log(preMessage);
  const content = fs.readFileSync(source, 'utf8'); 

  try {
    fs.statSync(target);
  } catch(e) {
    // Doesn't exist
    fs.writeFileSync(target, content, 'utf8');
  }
}

// NPM stuff
doExec(NPM_INIT, 'Initialize package.json...');
doExec(NPM_INSTALL, 'Install babel, eslint, flow, tape... (will take some time)');

// Create directory structure
mkdirSync(path.join(PWD, 'src'));
mkdirSync(path.join(PWD, 'test'));
mkdirSync(path.join(PWD, 'interfaces'));
mkdirSync(path.join(PWD, 'definitions'));

// Config file copying
copyFile(BABEL_RC, path.join(PWD, '.babelrc'), 'Creating .babelrc ...');
copyFile(FLOWCONFIG, path.join(PWD, '.flowconfig'), 'Creating .flowconfig ...');
copyFile(ESLINTRC, path.join(PWD, '.eslintrc'), 'Creating .eslintrc ...');
