/**
 * Created by alex on 04.12.14.
 */

var trumpet = require('trumpet');
var through = require('through');

var selector = trumpet();
var transformer = through(function(buf) {
    this.queue(new Buffer(buf.toString().toUpperCase()));
});


var content = selector.select('.loud');
var stream = content.createStream();
//var streamWrite = content.createWriteStream();
stream.pipe(transformer).pipe(stream)


process.stdin.pipe(selector).pipe(process.stdout);