const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const Guilds = require('../../database/models/guild.js');
const music = require('../../handlers/music.js');
const { MessageEmbed } = require('discord.js');
const msToTime = require('../../utils/msToTime.js');

class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            desc: 'Displays Guild\'s playlist.',
            usage: '{prefix}queue',
            example: '{prefix}queue',
            aliases: ['q', 'playlist'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS']
        })
    }

    async run(client, message, args, prefix) {
        let guild = await Guilds.findOne({ id: message.guild.id });
        if (!guild || !guild.playlist || guild.playlist.length === 0) return message.channel.send(embeds.errorEmbed(`:x: Guild Playlist is Empty, Add songs to playlist with \`${prefix}add [Youtube Link or Query]\``));

        let queue = music.playList(message.guild.id);
        if (!queue || queue.length === 0) queue = guild.playlist;
        let songs = guild.playlist;

        let queuelength = 0;
        songs.forEach(song => {
            queuelength += parseInt(song.time)*1000;
        });

        const queueEmbed = new MessageEmbed()
            .setAuthor(`Paylist of ${message.guild.name}`, 'https://imgur.com/rcBsdc5.gif')
            .setColor(0x8000FF);

        const maxWords = 6;

        if (message.guild.voice && message.guild.voice.connection) {
            let currentlyplaying = (songs.length - queue.length) + 1;

            let queueList = '';
            for (let i = 1; i <= songs.length; i++) {
                let song = songs[i - 1];
                if (song) {
                    if (i === currentlyplaying) queueList += `\`${i}.\` [${song.title.split(' ').splice(0, maxWords).join(' ')}](${song.url}) | \`${msToTime(parseInt(song.time)*1000)}\` | <a:currently_playing:714791202485960756>\n`;
                    else queueList += `\`${i}.\` [${song.title.split(' ').splice(0, maxWords).join(' ')}](${song.url}) | \`${msToTime(parseInt(song.time)*1000)}\`\n`;
                }
            }
            queueEmbed.setDescription(`
            **Now Playing:**
            [${queue[0].title}](${queue[0].url}) | \`${msToTime(parseInt(queue[0].time)*1000)}\`\n
            **loop-queue ${guild.loopqueue ? '✓' : '✗'} : loop-song ${guild.loopsong ? '✓' : '✗'}**
            ${queueList}
            `).setThumbnail(queue[0].thumbnail);
        } else {
            let queueList = '';
            for (let i = 1; i <= songs.length; i++) {
                let song = songs[i - 1];
                if (song) queueList += `\`${i}.\` [${song.title.split(' ').splice(0, maxWords).join(' ')}](${song.url}) | \`${msToTime(parseInt(song.time)*1000)}\`\n`;
            }
            queueEmbed.setDescription(`
            **Song will be played:**
            [${queue[0].title}](${queue[0].url}) | \`${msToTime(parseInt(queue[0].time)*1000)}\`\n
            **loop-queue ${guild.loopqueue ? '✓' : '✗'} : loop-song ${guild.loopsong ? '✓' : '✗'}**
                ${queueList}
            `)
                .setThumbnail('https://imgur.com/WgscvU0.gif');
        }
        queueEmbed.setFooter('Total Queue Time: ' + msToTime(queuelength));
        return message.channel.send(queueEmbed);
    }
}

module.exports = QueueCommand;
