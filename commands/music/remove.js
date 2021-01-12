const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const Guilds = require('../../database/models/guild.js');
const music = require('../../handlers/music.js');

class RemoveCommand extends Command {
    constructor(client){
        super(client, {
            name: 'remove',
            desc: 'Removes song from playlist.',
            usage: '{prefix}remove [Song Number]',
            example: '{prefix}remove 3',
            aliases: ['rm', 'rem'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
    }

    async run(client, message, args, prefix){
        let guild = await Guilds.findOne({ id: message.guild.id });
        if(!guild || !guild.playlist || guild.playlist.length === 0) return message.channel.send(embeds.errorEmbed(`:x: Guild Playlist is Empty, Add songs to playlist with \`${prefix}add [Youtube Link or Query]\``));
        if(!args[0]) return message.channel.send(embeds.errorEmbed('Invaild Usage, please try `'+prefix+'remove [song number]`'));
        
        let { playlist } = guild;
        if(isNaN(args[0]) || args[0] < 1 || args[0] > playlist.length) return message.channel.send(embeds.errorEmbed(`:x: Invaild song number, please check with \`${prefix}queue\``));
        
        let songNumber = parseInt(args[0]);
        let removedSong = playlist.splice(songNumber-1, 1);
        let newPlaylist = playlist;

        let queue = music.playList(message.guild.id);
        if(queue && message.guild.voice && message.guild.voice.connection && message.guild.voice.connection.dispatcher && removedSong[0].url === queue[0].url) {
            if(queue.length <= 1 && newPlaylist.length <= 0) message.guild.voice.connection.channel.leave();
            else await message.guild.voice.connection.dispatcher.end();
        }
        else music.remove(message.guild.id, removedSong[0]);

        await Guilds.findOneAndUpdate({ id: message.guild.id }, { playlist: newPlaylist });
        message.channel.send(embeds.successEmbed(':white_check_mark: Removed: `'+removedSong[0].title+'`'));
        if (newPlaylist.length <= 0) message.channel.send(embeds.warningEmbed(':warning: Guild\'s playlist got empty.'));
    }
}

module.exports = RemoveCommand;
