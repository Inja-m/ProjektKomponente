#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env node */
/* eslint no-console: 0 */

var args = require('yargs').usage('$0 <input> [output]').demand(1, 2, 'You must provide at least an input filename or URL').help('h').alias('h', 'help').strict().argv;

var _args$_ = _slicedToArray(args._, 2),
    input = _args$_[0],
    output = _args$_[1];

if (input === '-') {
    var receivedData = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', function () {
        var chunk = process.stdin.read();
        if (chunk) {
            receivedData += chunk.toString();
        }
    });

    process.stdin.on('end', function () {
        writeToOutput(JSON.parse(receivedData));
    });
} else if (input.startsWith('http://') || input.startsWith('https://')) {
    var query = _fs2.default.readFileSync(require.resolve('./introspectionQuery.txt'), { encoding: 'utf-8' });

    _request2.default.post(input, { json: { query: query } }, function (error, response, body) {
        if (error) {
            console.error('Could not query the GraphQL schema');
            console.error(error);
        } else if (response.statusCode !== 200) {
            console.error('Did not get HTTP 200 back from the endpoint');
            console.error(response.toJSON());
        } else {
            writeToOutput(body);
        }
    });
} else {
    writeToOutput(JSON.parse(_fs2.default.readFileSync(input, { encoding: 'utf-8' })));
}

function writeToOutput(result) {
    var outputStream = output ? _fs2.default.createWriteStream(output, { defaultEncoding: 'utf-8' }) : process.stdout;

    var distScript = void 0;

    try {
        distScript = require.resolve('graphql-docs.min.js');
    } catch (e) {
        var distPath = _path2.default.join(__dirname, '../dist/graphql-docs.min.js');
        if (_fs2.default.existsSync(distPath)) {
            distScript = _fs2.default.readFileSync(distPath, { encoding: 'utf-8' });
        } else {
            throw e;
        }
    }

    outputStream.write('\n        <!DOCTYPE html>\n        <html>\n            <head>\n                <title>GraphQL Docs</title>\n                <meta charset="utf-8">\n            </head>\n\n            <body>\n                <div id="app"></div>\n\n                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react.js"></script>\n                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react-dom.js"></script>\n                <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min.js"></script>\n                <script>\n                    ' + distScript + '\n                    function fetcher() {\n                        return new Promise(function(resolve) {\n                            resolve(' + JSON.stringify(result) + ');\n                        });\n                    }\n\n                    const rootElem = document.getElementById(\'app\');\n                    ReactDOM.render(\n                        React.createElement(\n                            GraphQLDocs.GraphQLDocs,\n                            {\n                                fetcher: fetcher,\n                            }),\n                        rootElem\n                    );\n                </script>\n            </body>\n        </html>\n    ');
}