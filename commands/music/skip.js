const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const Guilds = require('../../database/models/guild.js');

class SkipCommand extends Command {
    constructor(client){
        super(client, {
            name: 'skip',
            desc: 'Skips currently playing song',
            usage: '{prefix}skip',
            example: '{prefix}skip',
            aliases: ['s', 'next'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS']
        });
    }

    run(client, message, args, prefix){
        if(!message.guild.voice || !message.guild.voice.connection || !message.guild.voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: No Song is playing...'));
        const { loopsong } = await Guilds.findOne({ id: message.guild.id });
        if(loopsong) {
            require('../../handlers/music').forceSkip(message.guild.id);
        }
        message.guild.voice.connection.dispatcher.end();
        return message.channel.send(embeds.infoEmbed(':ballot_box_with_check: Skipped'));
    }
}

module.exports = SkipCommand;
