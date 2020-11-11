const Command = require('../../modules/command');
const Guilds = require('../../database/models/guild.js');
const embeds = require('../../utils/embeds.js');
const { MessageEmbed } = require('discord.js');
const { defaultPrefix, defaultVolume } = require('../../config.json');

class ResetCommand extends Command {
    constructor(client){
        super(client, {
            name: 'reset',
            desc: 'Used to reset bot\'s settings.',
            usage: '{prefix}reset',
            example: '{prefix}reset',
            aliases: [],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS'],
            userPermissions: ['MANAGE_GUILD']
        });
    }

    async run (client, message, args, prefix){
        let msg = await message.channel.send(embeds.warningEmbed(':warning: You are about to reset all settings to their defaults. Continue? (yes/no)'));
        try{
            const filter = m => m.author.id === message.author.id && (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() === 'no');
            var reply = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] });
            } catch(err) {
                const embed = new MessageEmbed()
                    .setDescription(':x: Timed out!')
                    .setColor('#FF0000');
                return msg.edit(embed);
            }
        if(reply.first().content.toLowerCase() === 'yes'){
            await Guilds.findOneAndUpdate({ id: message.guild.id }, {
                prefix: defaultPrefix,
                volume: defaultVolume,
                loopqueue: true,
                loopsong: false
            });
            if(message.guild.voice && message.guild.voice.connection && message.guild.voice.connection.dispatcher) await message.guild.voice.connection.dispatcher.setVolume(defaultVolume);
            return message.channel.send(embeds.successEmbed(':white_check_mark: All settings has been reset to their defaults.'));
        } else {
            return message.channel.send(embeds.successEmbed(':thumbsup: Reset aborted'));
        }
    }
}

module.exports = ResetCommand;