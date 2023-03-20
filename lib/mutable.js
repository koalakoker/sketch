const Writable = require("stream").Writable;

const mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (!this.muted) process.stdout.write(chunk, encoding);
    callback();
  },
});

exports.mutableStdout = mutableStdout;
