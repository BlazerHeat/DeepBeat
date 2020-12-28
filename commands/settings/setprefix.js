const Command = require('../../modules/command');
const Guilds = require('../../database/models/guild.js');
const embeds = require('../../utils/embeds.js');

class SetPrefixCommand extends Command {
    constructor(client){
        super(client, {
            name: 'setprefix',
            desc: 'Changes the prefix used to address bot.',
            usage: '{prefix}setprefix [New Prefix (The prefix cannot be more than 5 characters)]',
            example: '{prefix}setprefix ?',
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD']
        });
    }

    async run (client, message, args, prefix){
        if(!args[0]) return message.channel.send(embeds.errorEmbed(`:x: Please provide new prefix, eg: \`${prefix}setprefix [NewPrefix]\` (at most 5 characters)`));
        if(args[0].length > 5) return message.channels.send(embeds.errorEmbed(`:x: The prefix cannot be more than 5 characters.`));
        const newPrefix = args[0];

        await Guilds.findOneAndUpdate({ id: message.guild.id }, { prefix: newPrefix }, { upsert: true });
        return message.channel.send(embeds.successEmbed(`:white_check_mark: Command's prefix is changed to \`${newPrefix}\``));
    }
}

module.exports = SetPrefixCommand;