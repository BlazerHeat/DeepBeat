const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const music = require('../../handlers/music.js');
const Guilds = require('../../database/models/guild.js');
const ytdl = require('ytdl-core');
const youtube = require('../../utils/youtube.js');

class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'add',
            desc: 'Add songs to Guild\'s playlist.',
            usage: '{prefix}add [Youtube link or Query]',
            example: '{prefix}add Thunder Song',
            aliases: ['a'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS']
        });
    }

    async run(client, message, args, prefix) {
        if (!args[0]) return message.channel.send(embeds.errorEmbed(`:x: Please provide a search query, \`${prefix}add [Youtube Link or Query]\``));

        let query = args.join(' ');

        message.channel.send(embeds.successEmbed('**Searching :mag_right:** `' + query + '` **on** <:youtube:714502501046681733>'));

        let results = await youtube.search(query, 1);
        if (!results || !results.items || results.items.length === 0) return message.channel.send(embeds.errorEmbed(`:x: Song not found on <:youtube:714502501046681733>`));

        let guild = await Guilds.findOne({ id: message.guild.id });
        if(guild && guild.playlist && guild.playlist[0] && guild.playlist.some(x => x.url === `https://www.youtube.com/watch?v=${results.items[0].id.videoId}`)){
            return message.channel.send(embeds.errorEmbed(':x: Song already exists in Guild\'s playlist, please check with `'+prefix+'queue`'));
        }

        let songData = await ytdl.getInfo(results.items[0].id.videoId);

        let song = {
            url: `https://www.youtube.com/watch?v=${results.items[0].id.videoId}`,
            title: results.items[0].snippet.title,
            thumbnail: results.items[0].snippet.thumbnails.high.url,
            time: songData.videoDetails.lengthSeconds
        }

        message.channel.send(embeds.infoEmbed(`:ballot_box_with_check: [**Song Found**](${song.url})`));

        let newPlaylist = [];
        if (guild && guild.playlist && guild.playlist[0]) newPlaylist = guild.playlist;
        newPlaylist.push(song);

        await Guilds.findOneAndUpdate({ id: message.guild.id }, { playlist: newPlaylist }, { upsert: true, setDefaultsOnInsert: true });
        music.add(message.guild.id, song);
        return message.channel.send(embeds.infoEmbed(`<:upload:714717689528188928> Added \`${song.title}\` to Guild's playlist`));
    }
}

module.exports = AddCommand;
