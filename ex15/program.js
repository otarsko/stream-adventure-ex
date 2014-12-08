/**
 * Created by alex on 08.12.14.
 */

var tar = require('tar');
var zlib = require('zlib');
var crypto = require('crypto');

var cipherName = process.argv[2];
var passphrase = process.argv[3];

var unzipper = zlib.createGunzip();

var tarParser = tar.Parse();

tarParser.on('entry', function (e) {
    if (e.type === 'File') {

        var hasher = crypto.createHash("md5");
        var hash;
        e.on('data', function(buf) {
            hasher.update(buf);
        });

        e.on('end', function(buf) {
            hash = hasher.digest("hex");
            console.log(hash + ' ' + e.path)
        });

        /* off solution

         if (e.type !== 'File') return;

         var h = crypto.createHash('md5', { encoding: 'hex' });
         e.pipe(h).pipe(through(null, end)).pipe(process.stdout);

         function end () { this.queue(' ' + e.path + '\n') }

         */
    } else {
        //console.log();
    }
});

var decripter = crypto.createDecipher(cipherName, passphrase);


process.stdin.pipe(decripter).pipe(unzipper).pipe(tarParser);




