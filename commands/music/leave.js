const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');

class LeaveCommand extends Command {
    constructor(client){
        super(client, {
            name: 'leave',
            desc: 'Makes bot leave the voice channel.',
            usage: '{prefix}leave',
            example: '{prefix}leave',
            aliases: ['l'],
            guildOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
    }

    run(client, message, args, prefix){
        if(!message.guild.me.voice || !message.guild.me.voice.channel) return message.channel.send(embeds.errorEmbed(':x: Not connected to any voice channel.'));
        let channel = message.guild.me.voice.channel;
        if(message.guild.voice.connection && message.guild.voice.connection.dispatcher) message.guild.voice.connection.dispatcher.destroy();
        channel.leave();
        return message.channel.send(embeds.successEmbed(`:white_check_mark: Disconnected from <:speaker:714510570665279640>\`${channel.name}\``));
    }
}

module.exports = LeaveCommand;
