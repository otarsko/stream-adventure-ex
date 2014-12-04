/**
 * Created by alex on 04.12.14.
 */

var ws = require('websocket-stream');

var stream = ws('ws://localhost:8000');

stream.write('hello\n');
stream.end();