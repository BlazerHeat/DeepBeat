const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const Guilds = require('../../database/models/guild.js');
const music = require('../../handlers/music.js');
const { MessageEmbed } = require('discord.js');
const youtube = require('../../utils/youtube.js');
const ytdl = require('ytdl-core');

class SearchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            desc: 'Search songs on YouTube, then play or add them to Guild\'s playlist.',
            usage: '{prefix}search [Query]',
            example: '{prefix}search Thunder Song',
            aliases: ['find'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS']
        });
    }

    async run(client, message, args, prefix) {
        if (!message.member.voice || !message.member.voice.channel) return message.channel.send(embeds.errorEmbed(':x: You have to be in a voice channel to use this command.'));
        if (!args[0]) return message.channel.send(embeds.errorEmbed(`:x: Please provide a search query, \`${prefix}search [Youtube Link or Query]\``));
        let voiceChannel = message.member.voice.channel;

        let query = args.join(' ');

        message.channel.send(embeds.successEmbed('**Searching :mag_right:** `' + query + '` **on** <:youtube:714502501046681733>'));
        let data = await youtube.search(query);
        if (!data || !data.items || data.items.length == 0) return message.channel.send(embeds.errorEmbed(':x: No results found.'));
        else message.channel.send(embeds.infoEmbed(`:ballot_box_with_check: **Songs Found**`));

        let results = data.items;
        let desc = '';

        for (let i = 1; i <= results.length; i++) {
            desc += `\`${i}.\` [${results[i - 1].snippet.title}](https://youtube.com/watch?v=${results[i - 1].id.videoId}) | \`${results[i - 1].snippet.channelTitle}\`\n\n`;
        }
        desc += '\n**Type a number to make a choice, Type cancel to exit**'

        let embed = new MessageEmbed()
            .setDescription(desc)
            .setColor(0x8000FF);
        let msg = await message.channel.send(embed).catch(console.error);

        try{
        const filter = m => m.author.id === message.author.id && ((!isNaN(m.content) && m.content > 0 && m.content <= results.length) || m.content.toLowerCase() === 'cancel');
        var reply = await message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] });
        }catch(err){
            const embed = new MessageEmbed()
                .setDescription(':x: Timed out!')
                .setColor('#FF0000');
            return await msg.edit(embed);
        }

        if(reply.first().content.toLowerCase() === 'cancel'){
            const embed = new MessageEmbed()
                .setDescription(':white_check_mark: Cancelled!')
                .setColor('#08FF00');
            return await msg.edit(embed);
        }
        
        voiceChannel = reply.first().member.voice.channel;
        if (!voiceChannel) return message.channel.send(embeds.errorEmbed(':x: Not connected to any voice channel.'));
        let songNumber = parseInt(reply.first().content);
        let result = results[songNumber - 1];

        let songData = await ytdl.getInfo(result.id.videoId);

        const song = {
            url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
            title: result.snippet.title,
            thumbnail: result.snippet.thumbnails.high.url,
            time: songData.videoDetails.lengthSeconds
        }

        let guild = await Guilds.findOne({ id: message.guild.id });
        if (guild && guild.playlist && guild.playlist[0]) {
            let hasSong = guild.playlist.find(x => x.url == song.url);
            if (!hasSong) {
                //add Song to database
                guild.playlist.push(song);
                await Guilds.findOneAndUpdate({ id: message.guild.id }, { playlist: guild.playlist });
                await message.channel.send(embeds.infoEmbed(`<:upload:714717689528188928> Added \`${song.title}\` to Guild's playlist`));
                music.resetAndAdd(message.guild.id, song);
            }
            else {
                let songNumber = await music.getSongNumber(message.guild.id, song);
                await music.goto(message.guild.id, songNumber);
            }
        } else {
            await Guilds.findOneAndUpdate({ id: message.guild.id }, { playlist: [song] }, { upsert: true });
            message.channel.send(embeds.infoEmbed('<:upload:714717689528188928> Added Song to Guild\'s PlayList'));
            music.resetAndAdd(message.guild.id, song);
        }
        

        if(!message.guild.voice || !message.guild.voice.connection || !message.guild.voice.connection.dispatcher) {
            let clientVoiceChannel = message.guild.me.voice.channel;
            voiceChannel.join()
            .then(connection => {
                if (!clientVoiceChannel || clientVoiceChannel.id !== voiceChannel.id) message.channel.send(embeds.successEmbed('**Joined** <:speaker:714510570665279640>`' + voiceChannel.name + '`'));
                return music.play(connection, message, song);
            });
        }
        return msg.delete();
    }
}

module.exports = SearchCommand;
