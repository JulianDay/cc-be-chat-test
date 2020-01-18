// client.js
// Author:JiDa.Dai
// client Process
// 1.Input Name Connect Server 
// 2.Connect OK Send login To Server
// 3.While{ Input Message And Send Message}
// TODO:client should have a status control Process

const chalk = require('chalk');
const inquirer = require('inquirer');
const messageFactory = require('../common/jsonMessageFactory')
const messageDispatcher = require('../common/jsonMessageDispatcher')
global.msgDispatcher = new messageDispatcher();
require('./message/messageHandler');
const WebSocket = require('ws');

const run = async () => {
    const { name } = await askName();
    let ws = new WebSocket('ws://localhost:3000/');
    // Connect OK
    ws.on('open', function () {
        // Send login
        let msg = messageFactory.createMessage('login', { name: name });
        ws.send(msg);
    });

    //Receive message
    ws.on('message', function (message) {
        //hander Message
        try {
            msg = JSON.parse(message);
            global.msgDispatcher.Handler(msg.type, this, JSON.parse(msg.data));
        }
        catch (err) {
            console.log(chalk.red("handler msg : " + err));
        }
    });

    ws.on('close', function (code, reason) {
        console.log(chalk.red("[CLIENT] Connect close: " + code + " " + reason));
        ws.close();
    });

    ws.on('error', function (err) {
        console.log(chalk.red("[CLIENT] Connect error: " + err));
    });

    while (true) {
        const answers = await askChat();
        const message = answers.message;
        // Send Message To Server
        if (message.substr(0, 1) === '\/') // Command
        {
            var res = message.substr(1).match(/[a-zA-Z0-9]+/ig);
            let commandMsg = messageFactory.createMessage('command', { param: res });
            ws.send(commandMsg);
        }
        else {
            let chatMsg = messageFactory.createMessage('chat', { chatMsg: message });
            ws.send(chatMsg);
        }
    }

};

const askChat = () => {
    const questions = [
        {
            name: "message",
            type: "input",
            message: "Enter chat message:"
        }
    ];
    return inquirer.prompt(questions);
};

const askName = () => {
    const questions = [
        {
            name: "name",
            type: "input",
            message: "Enter your name:"
        }
    ];
    return inquirer.prompt(questions);
};

run();
