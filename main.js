#!/usr/bin/env node

const shell = require("shelljs")
const colors = require("colors");
const argv = require('yargs').argv;
const stdio = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function readLine() {
  return new Promise(resolve => {
    stdio.on('line', resolve)
  })
}

function close() {
  stdio.close()
}

+async function(){
  argv._.forEach(s => {
    convert(s)
    close()
  })

  if (argv._.length){
    return ;
  }
  let counter = 0;
  while(true){
    const t = await readLine()
    if (t.trim() == ''){
      counter ++;
    } else {
      convert(t)
    }
    if (counter == 2){
      close()
    }
  }
}()

function convert(sentence){
  const jh = shell.exec(`echo "${sentence}" | kakasi -iutf8 -outf8 -JH`, {
    silent: true
  }).stdout.trim()
  const ja = shell.exec(`echo "${sentence}" | kakasi -iutf8 -outf8 -Ja`, {
    silent: true
  }).stdout.trim()
  console.log(`${sentence}: ${colors.green(jh)} ${colors.green(ja)}\n`);
}