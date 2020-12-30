const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');

class ResumeCommand extends Command {
    constructor(client){
        super(client, {
            name: 'resume',
            desc: 'Resumes the paused player.',
            usage: '{prefix}resume',
            aliases: ['start', 're', 'res', 'continue'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
    }

    run(client, message, args, prefix){
        let voice = message.guild.voice;

        if(!voice || !voice.connection || !voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: Nothing is playing...'));

        let { dispatcher } = voice.connection;
        if(!dispatcher.paused) return message.channel.send(embeds.errorEmbed(':x: The player is not paused.'));

        dispatcher.resume();
        return message.channel.send(embeds.infoEmbed(':play_pause: Resuming'));
    
    }
}

module.exports = ResumeCommand;
