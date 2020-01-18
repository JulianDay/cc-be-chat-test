// profanityWordManager.js
// Author:JiDa.Dai
// profanityWord 1.Load File 2. filter profanity Word 3.string split To Word
var fs = require('fs');
var readline = require('readline');

class profanityWordManager {
    static profanityWord = new Array();
    // load file In Cache
    static loadFile() {
        const fReadName = './txt/list.txt';
        var fRead = fs.createReadStream(fReadName);
        var objReadline = readline.createInterface({
            input: fRead
        });
        objReadline.on('line', function (line) {
            profanityWordManager.profanityWord.push(line);
            //console.log('line:' + line);
        });
        objReadline.on('close', function () {

        });
    }
    //filter profanity Word
    static filterStr(str) {
        let replaceWord = '*';
        profanityWordManager.profanityWord.forEach((word) => {
            if (str.indexOf(word) !== -1) { // meet
                str = str.replace(word, replaceWord.repeat(word.length));
            }
        })
        return str;
    }
    //string split To Word
    static splitStr(str){
        return str.match(/[a-zA-Z0-9]+/ig);
    }
}

module.exports = profanityWordManager;