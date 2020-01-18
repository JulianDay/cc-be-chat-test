// messageHandler.js
// Author:JiDa.Dai
// Server Register Msg Key To Dispatcher And Handler Function

const player = require('../data/player')
const util = require('util')

const playerManager = require('../manager/playermanager')
const profantityWord = require('../manager/profanityWordManager')
const wordStatistcs = require('../manager/wordStatisticsManager')
const hisoryMsgMgr = require('../manager/historyMsgManager')
const messageFactory = require('../../common/jsonMessageFactory')


global.msgDispatcher.Register('login', login);
global.msgDispatcher.Register('loginOut', login);
global.msgDispatcher.Register('chat', chat);
global.msgDispatcher.Register('command', command);
// Player Login Create A player In playerManager
function login(webSocket, data) {
    console.log('login' + data.name);
    var p = playerManager.getSingleton().getPlayer(data.name)
    if (p) {
        p.webSocket = webSocket;
    }
    else {
        p = new player(data.name, webSocket);
        playerManager.getSingleton().addPlayer(p);
    }
    webSocket.user = p;
    // Update LoginTime
    p.loginTime = new Date().getTime();
    var list = hisoryMsgMgr.GetMsgList();
    list.forEach(msg => {
        webSocket.send(msg);
    });
}
// Player Chat 1.filter profantityWord 2. split to wordStatistcs
function chat(webSocket, data) {
    if (webSocket.user === undefined) {
        return;
    }
    console.log('chat: ' + webSocket.user.name + ':' + data.chatMsg);
    var p = playerManager.getSingleton().getPlayer(webSocket.user.name)
    if (p === undefined) {
        return;
    }
    let str = data.chatMsg;
    str = profantityWord.filterStr(str);
    wordArray = profantityWord.splitStr(str);
    const msg = messageFactory.createMessage('chatReply', { name: p.name, chatMsg: str });
    p.Chat(msg);
    wordStatistcs.addWord(wordArray);
    hisoryMsgMgr.PushMsg(msg);
}

//For Time Formation('00d 00h 00m 00s')
//TODO: Move function To util.js
function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

function formatSeconds(value) {
    var second = parseInt(value);
    var min = 0;
    var hour = 0;
    var day = 0;
    if (second > 60) {
        min = parseInt(second / 60);
        second = parseInt(second % 60);
        if (min > 60) {
            hour = parseInt(min / 60);
            min = parseInt(min % 60);
            if (hour > 24) {
                day = parseInt(hour / 24);
                hour = parseInt(hour % 24);
            }
        }
    }
    var result = '';
    var result = util.format('%sd:%sh:%sm:%ss', PrefixInteger(day, 2), PrefixInteger(hour, 2), PrefixInteger(min, 2), PrefixInteger(second, 2));
    return result;
}

//Client Send command
function command(webSocket, data) {
    if (webSocket.user === undefined) {
        return;
    }
    let param = data.param;
    console.log('command' + webSocket.user.name + ':' + param);
    let length = param.length;
    if (length <= 0) {
        return;
    }
    if (param[0] === 'popular') { // Find topPolularWord
        var topWord = wordStatistcs.topPolularWord();
        var ret = "PopularTop is :";
        for (let i = 0; i < topWord.length; i++) {
            ret += ("[ " + (i + 1) + " : " + topWord[i]['key'] + " ] ");
        }
        const msg = messageFactory.createMessage('commandReply', { result: ret });
        webSocket.send(msg)
    }
    else if (param[0] === 'stats') { // Find Player loginTime
        if (length <= 1) {
            return;
        }
        let username = param[1];
        var p = playerManager.getSingleton().getPlayer(username)
        if (p) {
            var nowtime = new Date().getTime();
            var interval = nowtime - p.loginTime;
            const msg = messageFactory.createMessage('commandReply', { result: "player :" + username + " logged " + formatSeconds(interval/1000) });
            webSocket.send(msg)
        }
        else {
            const msg = messageFactory.createMessage('commandReply', { result: "no player :" + username });
            webSocket.send(msg)
        }
    }
    else {
        const msg = messageFactory.createMessage('commandReply', { result: "no command :" + param[0] });
        webSocket.send(msg)
    }

}

function loginOut(webSocket, data) {
    console.log('loginOut');
}
