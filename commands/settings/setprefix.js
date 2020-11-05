const Command = require('../../modules/command');
const Guilds = require('../../database/models/guild.js');
const embeds = require('../../utils/embeds.js');

class SetPrefixCommand extends Command {
    constructor(client){
        super(client, {
            name: 'setprefix',
            desc: '',
            guildOnly: true
        })
    }

    async run (client, message, args, prefix){
        if(!args[0]) return message.channels.send(`Please provide new prefix, eg: \`${prefix}setprefix [NewPrefix]\``);

        const newPrefix = args[0];

        await Guilds.findOneAndUpdate({ id: message.guild.id }, { prefix: newPrefix }, { upsert: true });
        return message.channel.send(embeds.successEmbed(`:white_check_mark: Command's prefix is changed to \`${newPrefix}\``));
    }
}

module.exports = SetPrefixCommand;