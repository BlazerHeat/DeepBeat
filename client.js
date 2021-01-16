const DiscordClient = require('discord.js').Client;

class Client extends DiscordClient {

    constructor(token, ownerId, options = {}){
        super(options);
        this.owner = ownerId;
        this.login(token).catch(console.error);
        this.commands = new Map();
        this.aliases = new Map();
        this.on('error', console.error);
    }
    
    loadCommands(){
        return require('./handlers/command')(this);
    }

    autoLeaveVoice(){
        return require('./modules/autoLeaveVoice')(this);
    }

    showDblStats(){
        return require('./modules/dblStats')(this);
    }
}

module.exports = Client;