var pass = function(info) {
  console.log("pass::" + JSON.stringify(info));
};
var fail = function(info) {
  console.log("fail::" + JSON.stringify(info));
};
var end = function(info) {
  console.log("EXIT");
};

window.onerror = function(error, url, line) {
  fail({
    title: error,
    fullTitle: error,
    duration: 0,
    err: {
      message: 'ERROR:' + error + ' LINE:' + line,
      stack: ''
    }
  });
  end();
};

function Reporter(runner) {

  runner.on('pass', function(test) {
    pass({
      title: test.title,
      fullTitle: test.fullTitle(),
      duration: test.duration
    })
  });

  runner.on('fail', function(test, err) {
    fail({
      title: test.title,
      fullTitle: test.fullTitle(),
      duration: test.duration,
      err: {
        message: err.message,
        stack: err.stack
      }
    });
  });

  runner.on('end', function() {
    end();
  });
}


mocha.reporter(Reporter);