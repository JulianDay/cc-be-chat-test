// wordStatisticsManager.js
// Author:JiDa.Dai
// Statistics Word 
// 1. Add client Send Word In to expireWordMap
// 2. When expireWordMap Add or delete will changed  polularWordArray And Sort By Count
// 3. On Second Tick Will Check expire 5 seconds word,them will delete. becuse I use time as key, so only once call can delete a lot of Word, And Only less for Times;
class wordStatisticsManager {
    static expireWordMap = new Map();   //{secondTime,Array[word1,word2]}
    static polularWordArray = new Array();//[{key:'a',count:5},{key:'b',count:4}]
    static tickSecondTime = parseInt(new Date().getTime() / 1000);
    // Client Send Word Add this 
    static addWord(wordArray) {
        if (wordStatisticsManager.expireWordMap.has(wordStatisticsManager.tickSecondTime)) {
            wordArray.forEach(element => {
                wordStatisticsManager.expireWordMap.get(wordStatisticsManager.tickSecondTime).push(element) 
            });
        }
        else{
            var array = new Array();
            wordArray.forEach(element => {
                array.push(element) 
            });
            wordStatisticsManager.expireWordMap.set(wordStatisticsManager.tickSecondTime,array)
        }
        wordStatisticsManager.addPolularWord(wordArray);
    }

    static getPolularWord(word) {
        for (let i = 0; i < wordStatisticsManager.polularWordArray.length; i++) {
            if (wordStatisticsManager.polularWordArray[i]['key'] === word) {
                return i;
            }
        }
        return -1;
    }

    static addPolularWord(wordArray) {
        wordArray.forEach(word => {
            let index = wordStatisticsManager.getPolularWord(word);
            if (index === -1) {
                wordStatisticsManager.polularWordArray.push({ 'key': word, 'value': 1 });
            }
            else {
                wordStatisticsManager.polularWordArray[index]['value'] += 1;
            }
        });
        wordStatisticsManager.sortPolularWord();
    }

    static delPolularWord(wordArray) {
        wordArray.forEach(word => {
            let index = wordStatisticsManager.getPolularWord(word);
            if (index >= 0) {
                let count = wordStatisticsManager.polularWordArray[index]['value'] - 1;
                if (count <= 0) {
                    wordStatisticsManager.polularWordArray.splice(index, 1);
                }
                else {
                    wordStatisticsManager.polularWordArray[index]['value'] = count;
                }
            }
        });
        wordStatisticsManager.sortPolularWord();
    }

    static compare(p){ //这是比较函数
        return function(m,n){
            var a = m[p];
            var b = n[p];
            return b - a; //降序
        }
    }

    static sortPolularWord() {
        wordStatisticsManager.polularWordArray.sort(wordStatisticsManager.compare('value'));
    }

    static topPolularWord() {
        let array = new Array();
        for (let i = 0; i < wordStatisticsManager.polularWordArray.length && i < 5; i++) {
            array.push(wordStatisticsManager.polularWordArray[i])
        }
        return array;
    }
    // update second , delete word , update Top Array
    static secondTick() {
        wordStatisticsManager.tickSecondTime = parseInt(new Date().getTime() / 1000);
        let expireKeys = new Array();
        for (let second of wordStatisticsManager.expireWordMap.keys()) {
            if (wordStatisticsManager.tickSecondTime - second > 5) {
                expireKeys.push(second)
            }
        }
        let deleteWord = new Array();
        expireKeys.forEach(key => {
            wordStatisticsManager.expireWordMap.get(key).forEach(element => {
                deleteWord.push(element);
            });
            wordStatisticsManager.expireWordMap.delete(key);
        });
        wordStatisticsManager.delPolularWord(deleteWord);
    }

}

module.exports = wordStatisticsManager;