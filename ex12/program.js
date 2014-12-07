/**
 * Created by alex on 07.12.14.
 */

var combiner = require('stream-combiner');
var zlib = require('zlib');
var split = require('split');
var through = require('through');

module.exports = function() {

    var books = [];

    function write(buf) {
        if (buf) {
            var book = JSON.parse(buf.toString());
            books.push(book);
        }
    }

    function end() {

        var sortedBooks = {};

        for (entry in books) {
            var book = books[entry];

            var type;
            if (book.type == 'genre') {
                type = book.name;
            } else if(book.type == 'book') {
                if (type) {


                    var genreBooks = sortedBooks[type];
                    if (!genreBooks) {
                        genreBooks = [];
                        sortedBooks[type] = genreBooks;
                    }
                    genreBooks.push(book.name);
                    } else {
                    console.log('ERROR! No book type provided.');
                }
            } else {
                console.log('ERROR! Unknown type ' + book.type);
            }
        }

        var result = '';
        for (key in sortedBooks) {
            result += JSON.stringify({
                name: key,
                books: sortedBooks[key]
            }) + '\n';
        }

        this.queue(new Buffer(result));
        this.queue(null);
    }

    var writeStream = through(write, end);

    var twrite = function(buf) {
        //console.log(buf.toString());
        this.queue(buf);
    };

    var testStream = through(twrite);

    return combiner(split(), writeStream, testStream, zlib.createGzip());
};
