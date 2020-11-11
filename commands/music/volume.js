const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const Guilds = require('../../database/models/guild.js');

class VolumeCommand extends Command {
    constructor(client){
        super(client, {
            name: 'volume',
            desc: 'Changes msuic player\'s volume.',
            usage: '{prefix}volume [1 - 100]',
            example: '{prefix}volume 50',
            aliases: ['vol'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS']
        });
    }

    async run(client, message, args, prefix){
        if (!args[0]) {
            if (!message.guild.voice || !message.guild.voice.connection || !message.guild.voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: No Song is playing...'));
            let volume = message.guild.voice.connection.dispatcher.volume;
            return message.channel.send(embeds.infoEmbed('<:volume:715074813034627123> Current volume: `'+(volume*100).toFixed(0)+'%`'));
        }
        else if (isNaN(args[0]) || args[0] < 0 || args[0] > 100) return message.channel.send(embeds.errorEmbed(':x: Volume must lie between `0 - 100` %'));

        let newVolume = parseInt(args[0])/100;
        await Guilds.findOneAndUpdate({ id: message.guild.id }, { volume: newVolume }, { upsert: true });
        if(message.guild.voice && message.guild.voice.connection && message.guild.voice.connection.dispatcher) await message.guild.voice.connection.dispatcher.setVolume(newVolume);
        return message.channel.send(embeds.successEmbed('<:volume:715074813034627123> Volume is set to: `'+parseInt(args[0])+'%`'));
    }
}

module.exports = VolumeCommand;