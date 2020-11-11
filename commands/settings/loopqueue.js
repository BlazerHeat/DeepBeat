const Command = require('../../modules/command');
const Guilds = require('../../database/models/guild.js');
const embeds = require('../../utils/embeds.js');

class LoopQueueCommand extends Command {
    constructor(client){
        super(client, {
            name: 'loopqueue',
            desc: 'Enable or Disable playlist looping.',
            usage: '{prefix}loopqueue',
            example: '{prefix}loopqueue',
            aliases: ['lq'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS'],
            userPermissions: ['MANAGE_GUILD']
        });
    }

    async run (client, message, args, prefix){
        let guild = await Guilds.findOne({ id: message.guild.id });

        if(!guild || guild.loopqueue){
            await Guilds.findOneAndUpdate({ id: message.guild.id }, { loopqueue: false });
            return message.channel.send(embeds.infoEmbed(':repeat: **Disabled!**'));
        } else {
            await Guilds.findOneAndUpdate({ id: message.guild.id }, { loopqueue: true }, { upsert: true });
            return message.channel.send(embeds.infoEmbed(':repeat: **Enabled!**'));
        }
    }
}

module.exports = LoopQueueCommand;