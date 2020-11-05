const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');

class PlayCommand extends Command {
    constructor(client){
        super(client, {
            name: 'pause',
            desc: '',
            aliases: ['stop'],
            guildOnly: true,
            clientPermission: ['CONNECT', 'SPEAK', 'EMBED_LINKS']
        })
    }

    run(client, message, args, prefix){
        let voice = message.guild.voice;
        
        if(!voice || !voice.connection || !voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: Nothing is playing...'));

        let { dispatcher } = voice.connection;
        if(dispatcher.paused) return message.channel.send(embeds.errorEmbed(':x: The player is already paused.'));

        dispatcher.pause();
        return message.channel.send(embeds.infoEmbed(':arrow_forward: Paused'));
    
    }
}

module.exports = PlayCommand;
