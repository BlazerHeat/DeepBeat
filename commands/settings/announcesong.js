const Command = require('../../modules/command');
const Guilds = require('../../database/models/guild.js');
const embeds = require('../../utils/embeds.js');

class SetPrefixCommand extends Command {
    constructor(client){
        super(client, {
            name: 'announcesong',
            desc: 'Enable or Disable songs announcements.',
            usage: '{prefix}announcesong',
            aliases: ['as'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD']
        });
    }

    async run (client, message, args, prefix){
        let guild = await Guilds.findOne({ id: message.guild.id });

        if(guild && guild.announcesong){
            await Guilds.findOneAndUpdate({ id: message.guild.id }, { announcesong: false }, { upsert: true });
            return message.channel.send(embeds.infoEmbed(':loudspeaker: **Disabled!**'));
        } else {
            await Guilds.findOneAndUpdate({ id: message.guild.id }, { announcesong: true }, { upsert: true });
            return message.channel.send(embeds.infoEmbed(':loudspeaker: **Enabled!**'));
        }
    }
}

module.exports = SetPrefixCommand;