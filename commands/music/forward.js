const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const music = require('../../handlers/music.js');

class ForwardCommand extends Command {
    constructor(client){
        super(client, {
            name: 'forward',
            desc: 'Skip some amount of seconds in music stream.',
            usage: '{prefix}forward [amount in seconds]',
            example: '{prefix}forward 60',
            aliases: ['f'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS']
        });
    }

    run(client, message, args, prefix){
        let voice = message.guild.voice;
        if(!voice || !voice.connection || !voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: No Song is playing...'));

        if(!args[0] || isNaN(args[0]) || args[0] <= 0) return message.channel.send(embeds.errorEmbed(':x: Please provide amount of time (seconds) you want to forward and it can\'t be negative or zero.'));


        let seekAmount = Math.ceil(parseInt(args[0]) + (message.guild.voice.connection.dispatcher.streamTime/1000) + music.getSeek(message.guild.id));
        let songTime = music.playList(message.guild.id)[0].time;
        if(seekAmount >= songTime) return message.channel.send(embeds.errorEmbed(`<:error:714720672105889822> Song length is \`${songTime}\` seconds.`))

        message.guild.voice.connection.dispatcher.destroy();
        music.play(message.guild.voice.connection, message, null, seekAmount);
        return message.channel.send(embeds.infoEmbed(`<:forward:724539303102906388> Skipped \`${parseInt(args[0])}\` seconds.`));
    }
}

module.exports = ForwardCommand;
