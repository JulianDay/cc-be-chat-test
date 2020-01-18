// jsonMessageFactory.js
// Author:JiDa.Dai
// Use Create Client And Server Message
class jsonMessageFactory {

    // @param `type` - msg Key
    // @param `data` - msg data
    static createMessage(type, data) {
        return JSON.stringify({
            type: type,
            data: JSON.stringify(data)
        });
    }

}

module.exports = jsonMessageFactory;