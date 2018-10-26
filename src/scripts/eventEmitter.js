import { EventEmitter } from "events";
import { app } from "electron";
import Parser from "./parser";
import Gripper from "./gripper";
var fs = require("fs");
/*
    This module provides a way to sequence the asynchronous execution of
    external programs
*/

var emitter = new EventEmitter();

emitter.on("clingo-finished", arg => {
  console.log("from emitter - clingo exit with code: " + arg);
  let parser = new Parser();
  parser.start();
});

emitter.on("parser-finished", arg => {
  console.log("from emitter - parser exit with code: " + arg);
  let parsed = fs.readFileSync(
    `${app.getAppPath()}/../Clingo/parsed.txt`,
    "utf-8"
  );

  let gripper = new Gripper();
  let argv = parsed.split(" ");
  gripper.start(argv);
});

emitter.on("gripper-finished", arg => {
  console.log("from emitter - gripper exit with code: " + arg);

  // clear out.inp
  fs.truncate(`${app.getAppPath()}/../Clingo/out.inp`, 0, function() {
    console.log("out.inp cleaned");
  });
});

export const eventEmitter = emitter;
