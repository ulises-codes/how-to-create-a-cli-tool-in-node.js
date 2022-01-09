"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var Readline = __importStar(require("readline"));
var fs = __importStar(require("fs"));
var formatDate = function (date) {
    return date.toLocaleDateString('en-us', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
function createBlogPost(outDir) {
    if (outDir === void 0) { outDir = './blog'; }
    var answers = {
        title: '',
        author: 'John Connor',
        publishDate: formatDate(new Date()),
        synopsis: ''
    };
    var readline = Readline.createInterface(process.stdin, process.stdout);
    readline.question('Title: ', function (title) {
        answers.title = title;
        readline.question('Author: ', function (author) {
            answers.author = author;
            readline.question('Publish Date: ', function (publishDate) {
                // Check if date is valid, don't care if it's in the past
                if (publishDate && new Date(publishDate)) {
                    answers.publishDate = formatDate(new Date(publishDate));
                }
                readline.question('Synopsis: ', function (synopsis) {
                    answers.synopsis = synopsis;
                    // Auto-generate a filename based on the blog post's title
                    var filename = answers.title.toLowerCase().replace(/ /g, '-');
                    // Since we're writing to an mdx file, this metadata will be included in a yaml-style
                    // header, which is opened with '---'
                    var fileContents = '---\n';
                    for (var _i = 0, _a = Object.entries(answers); _i < _a.length; _i++) {
                        var _b = _a[_i], key = _b[0], value = _b[1];
                        fileContents += "".concat(key, ": \"").concat(value, "\"\n");
                    }
                    // Close the header
                    fileContents += '---';
                    // Create the directory if it doesn't exist
                    fs.mkdirSync(outDir, { recursive: true });
                    // Write the file
                    fs.writeFileSync("".concat(outDir, "/").concat(filename, ".mdx"), fileContents);
                    readline.close();
                });
            });
            // Do this to display a default a value for 'Publish Date'
            readline.write(answers.publishDate);
        });
        // Do this to display a default value for 'Author'
        readline.write(answers.author);
    });
}
exports["default"] = createBlogPost;
