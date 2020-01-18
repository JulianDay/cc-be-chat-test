// playerManager.js
// Author:JiDa.Dai
// A Map manager（Singleton） player Data
//require('../data/player')
let instance = null;
class playerManager {
    constructor() {
        this.playerMap = new Map();
    }

    addPlayer(player) {
        if (!this.playerMap.has(player.name)) {
            this.playerMap.set(player.name, player);
        }
    }

    getPlayer(playerName) {
        return this.playerMap.get(playerName)
    }


    static getSingleton() {
        if (instance == null) {
            instance = new playerManager();
        }
        return instance;
    }
}

module.exports = playerManager;