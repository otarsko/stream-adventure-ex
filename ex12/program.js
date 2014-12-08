/**
 * Created by alex on 07.12.14.
 */

var duplexer = require('duplexer');
var through = require('through');

module.exports = function(counter) {

    var countries = {

    };

    var write = function(obj) {

        if (countries[obj.country]) {
            countries[obj.country] += 1;
        } else {
            countries[obj.country] = 1;
        }
    };

    var end = function() {
        counter.setCounts(countries);
    };

    var writableStream = through(write, end);

    return duplexer(writableStream, counter);
};