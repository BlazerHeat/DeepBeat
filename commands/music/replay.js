const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const music = require('../../handlers/music.js');

class ReplayCommand extends Command {
    constructor(client){
        super(client, {
            name: 'replay',
            desc: 'Replays currently playing song.',
            usage: '{prefix}replay',
            example: '{prefix}replay',
            aliases: [],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
    }

    run(client, message, args, prefix){
        if(!message.guild.voice || !message.guild.voice.connection || !message.guild.voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: No Song is playing...'));

        let queue = music.playList(message.guild.id);
        let song = queue[0];
        message.guild.voice.connection.dispatcher.destroy();
        message.channel.send(embeds.infoEmbed(':repeat: Replaying...'));
        return music.play(message.guild.voice.connection, message, song);
    }
}

module.exports = ReplayCommand;
