// player.js
// Author:JiDa.Dai
// player Data Name,Chat Num, Login Time and so on
class player {
    constructor(name, socket) {
        this.name = name;
        this.socket = socket;
        this.chatNum = 0;
        this.loginTime = '';
    }
    // Send msg To Client
    Send(msg) {
        if (this.socket !== null) {
            this.socket.send(msg);
        }
    }
    // Chat Action
    Chat(msg) {
        this.chatNum++;
        this.socket.wss.broadcast(msg)
    }

}
module.exports = player;