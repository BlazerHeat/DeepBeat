const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const music = require('../../handlers/music.js');
const Guilds = require('../../database/models/guild.js');

class PreviousCommand extends Command {
    constructor(client){
        super(client, {
            name: 'previous',
            desc: 'Play previous song in playlist.',
            usage: '{prefix}previous',
            example: '{prefix}previous',
            aliases: ['pre', 'unskip', 'last'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
    }

    async run(client, message, args, prefix){
        if(!message.guild.voice || !message.guild.voice.connection || !message.guild.voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: No Song is playing...'));
        let playlist = music.playList(message.guild.id);
        let songNumber = await music.getSongNumber(message.guild.id, playlist[0]);
        let guild = await Guilds.findOne({ id: message.guild.id });

        if(songNumber-1 <= 0) songNumber = guild.playlist.length+1;

        await music.goto(message.guild.id, songNumber-1);
        await music.play(message.guild.voice.connection, message);
        return message.channel.send(embeds.infoEmbed(':ballot_box_with_check: UnSkipped'));
    }
}

module.exports = PreviousCommand;
