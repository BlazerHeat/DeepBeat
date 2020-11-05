const DiscordClient = require('discord.js').Client;

class Client extends DiscordClient {

    constructor(token, ownerId, options = {}){
        super(options);
        this.owner = ownerId;
        this.login(token).catch(console.error);
        this.commands = new Map();
        this.aliases = new Map();
    }
    
    loadCommands(){
        return require('./handlers/command').loadCommands(this);
    }
}

module.exports = Client;