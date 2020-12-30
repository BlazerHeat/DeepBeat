const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const Guilds = require('../../database/models/guild.js');
const { refreshPlaylist } = require('../../handlers/music.js');

class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            desc: 'Clears Guild\'s playlist.',
            usage: '{prefix}clear',
            aliases: ['cl'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
    }

    async run(client, message, args, prefix) {
        let guild = await Guilds.findOne({ id: message.guild.id });
        if(!guild || !guild.playlist || !guild.playlist[0]) return message.channel.send(embeds.errorEmbed(':x: Guild\'s Queue is already empty.'));

        if(message.guild.voice && message.guild.voice.connection && message.guild.voice.connection.dispatcher) {
            message.guild.voice.connection.dispatcher.destroy();
            message.guild.voice.connection.channel.leave();
        }
        await Guilds.findOneAndUpdate({ id: message.guild.id }, { playlist: []});
        refreshPlaylist(message.guild.id);
        return message.channel.send(embeds.infoEmbed(':ballot_box_with_check: Cleared Guild\'s playlist'));
    }
}

module.exports = ClearCommand;
