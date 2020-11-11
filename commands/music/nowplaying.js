const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const music = require('../../handlers/music.js');
const { MessageEmbed } = require('discord.js');
const msToTime = require('../../utils/msToTime.js');

class NowPlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nowplaying',
            desc: 'Display currently playing song.',
            usage: '{prefix}nowplaying',
            example: '{prefix}nowplaying',
            aliases: ['np'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS']
        });
    }

    run(client, message, args, prefix) {
        if (!message.guild.voice || !message.guild.voice.connection || !message.guild.voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: No Song is playing...'));

        let { dispatcher } = message.guild.voice.connection;
        let song = music.playList(message.guild.id)[0];

        let seekAmount = music.getSeek(message.guild.id);
        let songtime = (parseInt(song.time) * 1000).toFixed(0);
        let completed = (dispatcher.streamTime + (seekAmount * 1000)).toFixed(0);

        let barlength = 45;
        let completedpercent = ((completed / songtime) * barlength).toFixed(0);
        let array = [];

        for (let i = 0; i < completedpercent - 1; i++) {
            array.push('⎯');
        }
        array.push('⭗');
        for (let i = 0; i < barlength - completedpercent - 1; i++) {
            array.push('⎯');
        }

        let embed = new MessageEmbed()
            .setAuthor('Now Playing:', 'https://imgur.com/rcBsdc5.gif')
            .setTitle(song.title)
            .setURL(song.url)
            .setDescription(`\`${array.join('')}\`\n\`${msToTime(completed)} / ${msToTime(songtime)}\``)
            .setTimestamp()
            .setThumbnail(song.thumbnail)
            .setColor(0x8000FF);
        return message.channel.send(embed);
    }
}

module.exports = NowPlayingCommand;
