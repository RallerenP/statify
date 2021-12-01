#! /usr/bin/env node
import { Chalk } from 'chalk'
import { exec as _exec } from 'child_process';
import { __dirname } from './util.cjs';
import path from 'path';

const c = new Chalk( {level: 3 });
let interval; 

const command = process.argv[2];

switch(command) {
  case "create":
  case "c":
    create();
    break;
  default: 
    unknown();
    break;
}

async function create() {
  const name = process.argv[3];
  
  // TODO: More validation
  // No special characters, no empty space
  if (!name) {
    error('No module name provided')
    console.log(`
    Usage
      statify ${c.blue('create')} [YOUR_MODULE_NAME]
    `)
    return
  }

  loading(true, "  Generating...");
  await exec(`cd ${path.join(__dirname, '..', 'backend')} && nest g mo ${name} && nest g co ${name} --no-spec && nest g s ${name} --no-spec`);
  loading(false);
  console.log();
  console.log(`${c.green('CREATE')} ${name} integration module`)
}

function unknown() {
  error(`Invalid command: ${command}`)
  help();
}

function error(text) {
  console.log(`
    ${c.bold.black.bgHex('#db043a')(' Error ')} ${text}`)
}

function help() {
  console.log(`
    Commands:
      • create or c - Create an integration module
      
  `)
}


function loading(loading, text) {
  clearInterval(interval);
  if (loading) {
    let P = ["\\", "|", "/", "-"];
    let x = 0;
    interval = setInterval(function() {
      process.stdout.write("\r" + P[x++] + text);
      x &= 3;
    }, 250);
  }
  else {
    clearInterval(loading)
  }
}

function exec(command) {
  return new Promise((resolve, reject) => {
    _exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    })
  })
}