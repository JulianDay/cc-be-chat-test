// jsonMessageDispatcher.js
// Author:JiDa.Dai
// (Subscribe/Publish)Message Dispatcher
class jsonMessageDispatcher {
    constructor() {
        this.msgHandler = new Map();
    }
    // @param `msgType` - msg Key
    // @param `handler` - msg handler function
    Register(msgType, handler) {
        this.msgHandler.set(msgType, handler);
    }
    //
    UnRegister(msgType) {
        this.msgHandler.delete(msgType)
    }
    // @param `msgType` - msg Key
    // @param `webSocket` - webSocket msg sender 
    // @param `data` - msg data
    Handler(msgType, webSocket, data) {
        try {
            this.msgHandler.get(msgType)(webSocket, data);
        }
        catch (err) {
            console.log("handler msgType : " + msgType + ' ' + err);
        }
    }
}

module.exports = jsonMessageDispatcher;