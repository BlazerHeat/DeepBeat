const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const music = require('../../handlers/music.js');
const Guilds = require('../../database/models/guild.js');

class GotoCommand extends Command {
    constructor(client){
        super(client, {
            name: 'goto',
            desc: 'skip to a certain song in playlist.',
            usage: '{prefix}goto [Song Number]',
            example: '{prefix}goto 3',
            aliases: ['skipto'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS']
        });
    }

    async run(client, message, args, prefix){

        if(!message.guild.voice || !message.guild.voice.connection) {
            if (!message.member.voice || !message.member.voice.channel) return message.channel.send(embeds.errorEmbed(':x: You are not connected to any voice channel'));
            let voiceChannel = message.member.voice.channel;
            lclientVoiceChannel = message.guild.me.voice.channel;
            voiceChannel.join()
            .then(() => {
                if (!clientVoiceChannel || clientVoiceChannel.id !== voiceChannel.id) message.channel.send(embeds.successEmbed('**Joined** <:speaker:714510570665279640>`' + voiceChannel.name + '`'));
            }).catch(console.error);
        }

        if(!args[0]) return message.channel.send(embeds.errorEmbed(`:x: Please provide a song number from \`${prefix}queue\``));
        let guild = await Guilds.findOne({ id: message.guild.id });
        if(!guild || !guild.playlist || guild.playlist.length == 0) return message.channel.send(embeds.errorEmbed(`:x: Guild Playlist is Empty, Add songs to playlist with \`${prefix}add [Youtube Link or Query]\``));
        let songs = guild.playlist;
        if(isNaN(args[0]) || args[0] <= 0 || args[0] > songs.length) return message.channel.send(embeds.errorEmbed(`:x: Invalid song number.`));
        

        await music.goto(message.guild.id, args[0]);
        if(message.guild.voice.connection.dispatcher) message.guild.voice.connection.dispatcher.destroy();
        return music.play(message.guild.voice.connection, message);
    }
}

module.exports = GotoCommand;