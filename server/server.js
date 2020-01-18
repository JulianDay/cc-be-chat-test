// server.js
// Author:JiDa.Dai
// server Process
// 1.Init Other Manager 
// 2.Start Web Server
// 3.Wait Client Msg And Handle Msg
// 4.Timer Static Word Num
// 5.Manager Player
// 6.Profanity Word
const WebSocket = require('ws');

const messageDispatcher = require('../common/jsonMessageDispatcher')
global.msgDispatcher = new messageDispatcher();
require('./message/messageHandler');

const profantityWord = require('../server/manager/profanityWordManager')
profantityWord.loadFile();

require('./manager/timeManager')

const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({
    port: 3000
});

wss.on('connection', function (ws) {
    //Bind object
    ws.wss = wss;
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        try {
            msg = JSON.parse(message);
            global.msgDispatcher.Handler(msg.type, this, JSON.parse(msg.data));
        }
        catch (err) {
            console.log("handler msg : " + err);
        }
    })
    //TODO
    ws.on('close',function(code,reason){

    });
    //TODO
    ws.on('error',function(err) {
        
    })
});

// Server broadcast
wss.broadcast = function (data) {
    wss.clients.forEach(function (client) {
        client.send(data, (err) => {
            if (err) {
                console.log(`[SERVER] send msg error: ${err}`);
            }
        });
    });
};
