/**
 * Created by alex on 04.12.14.
 */

var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function(cmd, args){
    var child = spawn(cmd, args);

    var duplexStream = duplexer(child.stdin, child.stdout);
    return duplexStream;
};

