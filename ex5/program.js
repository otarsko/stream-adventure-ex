var split = require('split');
var through = require('through');

var counter = 0;

function write (buf) {
    counter++;
    if (counter % 2 == 0) {
        this.queue(new Buffer(buf.toString().toUpperCase() + '\n'));
    } else {
        this.queue(new Buffer(buf.toString().toLowerCase() + '\n'));
    }
}

var transformer = through(write, null);

process.stdin.pipe(split()).pipe(transformer).pipe(process.stdout);