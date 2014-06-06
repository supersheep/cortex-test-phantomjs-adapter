var events = require('events');
var util = require('util');
var fs = require('fs');
var node_path = require('path');
var url = require('url');
var Runner = require('./runner');
var http = require('http');

module.exports = PhantomjsAdapter;

module.exports.build_mode = "local";

util.inherits(PhantomjsAdapter, events.EventEmitter);


function PhantomjsAdapter(config) {
  this.path = config.path;

  return this;
}

PhantomjsAdapter.prototype.test = function() {
  var testRunner = new Runner(this.path);
  // an test instance should be returned
  return testRunner;
}