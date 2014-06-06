var page = require('webpage').create()
var system = require('system');

page.onConsoleMessage = function(msg) {
  if (msg == "EXIT") {
    phantom.exit(0);
  } else {
    system.stderr.writeLine(msg);
  }
};

page.open(system.args[1], function() {
  page.injectJs("inject.js");
});