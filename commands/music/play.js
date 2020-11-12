const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const ytdl = require('ytdl-core');
const youtube = require('../../utils/youtube.js');
const music = require('../../handlers/music.js');
const Guilds = require('../../database/models/guild');


class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            desc: 'Play song through link, query or playlist',
            usage: '{prefix}play [Youtube link or Query]',
            example: '{prefix}play Thunder Song',
            aliases: ['p'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS']
        });
    }

    async run(client, message, args, prefix) {
        let author = message.member;
        if (!author.voice || !author.voice.channel) return message.channel.send(embeds.errorEmbed(':x: You are not connected to any voice channel'));


        let song = null;


        if (!args[0]){
            if(message.guild.voice && message.guild.voice.connection && message.guild.voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: Already playing a song.'));
            let guild = await Guilds.findOne({ id: message.guild.id });
            if(!guild || !guild.playlist || guild.playlist.length == 0) return message.channel.send(embeds.errorEmbed(`:x: Guild Playlist is Empty, Add songs to playlist with \`${prefix}add [Youtube Link or Query]\``));
            music.createPlaylist(message.guild.id);
            message.channel.send(embeds.infoEmbed(':pencil: Playing Songs from Guild\'s Playlist'));
        }
        else {
            let query = args.join(' ');

            message.channel.send(embeds.successEmbed('**Searching :mag_right:** `' + query + '` **on** <:youtube:714502501046681733>'));

            let results = await youtube.search(query, 1);
            if (!results || !results.items || results.items.length == 0) return message.channel.send(embeds.errorEmbed(`:x: Song not found on <:youtube:714502501046681733>`));

            let songData = await ytdl.getInfo(results.items[0].id.videoId);

            song = {
                url: `https://www.youtube.com/watch?v=${results.items[0].id.videoId}`,
                title: results.items[0].snippet.title,
                thumbnail: results.items[0].snippet.thumbnails.high.url,
                time: songData.videoDetails.lengthSeconds
            }

            message.channel.send(embeds.infoEmbed(`:ballot_box_with_check: [**Song Found**](${song.url})`));

            let playlist = null;
            let guild = await Guilds.findOne({ id: message.guild.id });
            if (!guild || !guild.playlist || !guild.playlist[0]) {
                playlist = [song];
                await Guilds.findOneAndUpdate({ id: message.guild.id }, { playlist: playlist }, { upsert: true });
                message.channel.send(embeds.infoEmbed(`<:upload:714717689528188928> Added \`${song.title}\` to Guild's playlist`));
                music.resetAndAdd(message.guild.id, song);
            } else {
                playlist = guild.playlist;
                let hasSong = playlist.find(x => x.url == song.url);
                if (!hasSong) {
                    playlist.push(song);
                    await Guilds.findOneAndUpdate({ id: message.guild.id }, { playlist: playlist }, { upsert: true });
                    message.channel.send(embeds.infoEmbed(`<:upload:714717689528188928> Added \`${song.title}\` to Guild's playlist`));
                    music.resetAndAdd(message.guild.id, song);
                } else {
                    let songNumber = await music.getSongNumber(message.guild.id, song);
                    await music.goto(message.guild.id, songNumber);
                }
            }
        }
        let voiceChannel = author.voice.channel;
        let clientVoiceChannel = message.guild.me.voice.channel;
        voiceChannel.join()
            .then(connection => {
                if (!clientVoiceChannel || clientVoiceChannel.id !== voiceChannel.id) message.channel.send(embeds.successEmbed('**Joined** <:speaker:714510570665279640>`' + voiceChannel.name + '`'));
                connection.voice.setSelfDeaf(true);
                return music.play(connection, message, song);

            }).catch(console.error);
    }
}

module.exports = PlayCommand;
