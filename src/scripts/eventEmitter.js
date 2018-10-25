import { EventEmitter } from "events";
import { app } from "electron";
import Parser from "./parser";
var fs = require("fs");
/*
    This module provides a way to sequence the asynchronous execution of
    external programs
*/

var emitter = new EventEmitter();

emitter.on("clingo-finished", arg => {
  console.log("Emitter: clingo exit with code: " + arg);
  let parser = new Parser();
  parser.start();
});

emitter.on("parser-finished", arg => {
  console.log("Emitter: parser exit with code: " + arg);

  // clear out.inp
  fs.truncate(`${app.getAppPath()} + /../Clingo/out.inp`, 0, function() {
    console.log("out.inp cleaned");
    console.log(app.getAppPath());
  });
});

export const eventEmitter = emitter;
