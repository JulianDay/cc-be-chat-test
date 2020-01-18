// messageHandler.js
// Author:JiDa.Dai
// Client Register Msg Key To Dispatcher And Handler Function
const chalk = require('chalk');
global.msgDispatcher.Register('chatReply', chatReply);
global.msgDispatcher.Register('commandReply', commandReply);

//chat Reply Msg
function chatReply(webSocket, data) {
    console.log(chalk.blue('['+data.name + '] : ') + data.chatMsg);
}

function commandReply(webSocket, data) {
    console.log(chalk.green('[result] : ') + data.result);
}