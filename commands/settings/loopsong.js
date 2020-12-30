const Command = require('../../modules/command');
const Guilds = require('../../database/models/guild.js');
const embeds = require('../../utils/embeds.js');

class LoopSongCommand extends Command {
    constructor(client){
        super(client, {
            name: 'loopsong',
            desc: 'Enable or Disable song looping.',
            usage: '{prefix}loopsong',
            aliases: ['ls'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD']
        });
    }

    async run (client, message, args, prefix){
        let guild = await Guilds.findOne({ id: message.guild.id });

        if(guild && guild.loopsong){
            await Guilds.findOneAndUpdate({ id: message.guild.id }, { loopsong: false }, { upsert: true });
            return message.channel.send(embeds.infoEmbed(':repeat_one: **Disabled!**'));
        } else {
            await Guilds.findOneAndUpdate({ id: message.guild.id }, { loopsong: true }, { upsert: true });
            return message.channel.send(embeds.infoEmbed(':repeat_one: **Enabled!**'));
        }
    }
}

module.exports = LoopSongCommand;