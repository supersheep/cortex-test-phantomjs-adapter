var spawn = require('child_process').spawn;
var events = require('events');
var util = require('util');
var path = require('path');
var phantomjs = require('phantomjs');

util.inherits(Runner, events.EventEmitter);

function Runner(htmlpath) {
  var self = this;
  var run = spawn(phantomjs.path, [path.join(__dirname, '..', 'phantomjs-main.js'), htmlpath]);
  var logs = [];
  var passes = [];
  var failures = [];
  var phantomjsLogRegExp = /^\d{4}-\d{2}-\d{2}\ \d{2}:\d{2}:\d{2}\.\d{3} phantomjs/;
  run.on('exit', function() {
    var result = {
      data: {
        logs: logs,
        passes: passes,
        failures: failures
      }
    };
    self.emit("done", result);
    self.emit("complete");
  });

  function dataHandler(data) {
    var log = data.toString();
    if (log.match("::")) {
      var detail = log.split("::");
      var type = detail[0];
      var data = JSON.parse(detail[1]);
      if (type == "pass") {
        passes.push(data);
      } else if (type == "fail") {
        failures.push(data);
      }
    } else {
      if (!phantomjsLogRegExp.test(log)) {
        logs.push(log);
      }
    }
  }

  run.stdout.on('data', dataHandler);


  run.stderr.on('data', dataHandler);
}

module.exports = Runner;