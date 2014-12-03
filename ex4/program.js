var through = require('through');

function write(buf) {
    this.queue(new Buffer(buf.toString().toUpperCase()));
}


var transformer = through(write, null);

process.stdin.pipe(transformer).pipe(process.stdout);