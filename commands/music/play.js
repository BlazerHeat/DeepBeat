const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const ytdl = require('ytdl-core');

class PlayCommand extends Command {
    constructor(client){
        super(client, {
            name: 'play',
            desc: '',
            aliases: ['p'],
            guildOnly: true
        })
    }

    run(client, message, args, prefix){
        let author = message.member;
        if(!author.voice || !author.voice.channel) return message.channel.send(embeds.errorEmbed(':x: You are not connected to any voice channel'));
        if(!args[0]) return message.channel.send(embeds.errorEmbed(':x: Please provide a URL'));
        let url = args[0];

        let voiceChannel = author.voice.channel;

        voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.play(ytdl(url, { quality: `highestaudio`, highWaterMark: 1 << 25, filter: 'audioonly' }), { volume: 0.7 });
            dispatcher.on('finish', () => {
                connection.play(ytdl(url, { quality: `highestaudio`, highWaterMark: 1 << 25, filter: 'audioonly' }), { volume: 0.7 });
            });
        }).catch(console.error);
    }
}

module.exports = PlayCommand;
