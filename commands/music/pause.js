const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');

class PauseCommand extends Command {
    constructor(client){
        super(client, {
            name: 'pause',
            desc: 'Pause the player.',
            usage: '{prefix}pause',
            example: '{prefix}pause',
            aliases: ['stop'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
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

module.exports = PauseCommand;
