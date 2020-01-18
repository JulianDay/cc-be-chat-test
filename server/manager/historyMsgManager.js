// historyMsgManager.js
// Author:JiDa.Dai
// Array Save historyMsg
class historyMsgManager
{
    static msgList = new Array();

    static PushMsg(msg)
    {
        if(historyMsgManager.msgList.length >= 50)
        {
            msgList.shift();
        }
        historyMsgManager.msgList.push(msg)
    }

    static GetMsgList()
    {
        return historyMsgManager.msgList;
    }
}

module.exports = historyMsgManager;