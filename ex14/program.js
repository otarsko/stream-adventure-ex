/**
 * Created by alex on 08.12.14.
 */
var crypto = require('crypto');

var passPhrase = process.argv[2];

var cryptStream = crypto.createDecipher('aes256', passPhrase);

process.stdin.pipe(cryptStream).pipe(process.stdout);
