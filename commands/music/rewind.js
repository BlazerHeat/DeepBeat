const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const music = require('../../handlers/music.js');
const msToTime = require('../../utils/msToTime.js');

class RewindCommand extends Command {
    constructor(client){
        super(client, {
            name: 'rewind',
            desc: 'Rewind some amount of seconds in music stream.',
            usage: '{prefix}rewind [amount in seconds]',
            example: '{prefix}rewind 5',
            aliases: ['r'],
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS']
        });
    }

    run(client, message, args, prefix){
        let voice = message.guild.voice;
        if(!voice || !voice.connection || !voice.connection.dispatcher) return message.channel.send(embeds.errorEmbed(':x: No Song is playing...'));

        if(!args[0] || isNaN(args[0]) || args[0] <= 0) return message.channel.send(embeds.errorEmbed(':x: Please provide amount of time (seconds) you want to Rewind and it can\'t be negative or zero.'));


        let seekAmount = Math.floor(music.getSeek(message.guild.id) + (message.guild.voice.connection.dispatcher.streamTime/1000) - parseInt(args[0]));
        let songTime = music.playList(message.guild.id)[0].time;
        let completed = message.guild.voice.connection.dispatcher.streamTime + music.getSeek(message.guild.id)*1000;
        if(seekAmount <= 0) return message.channel.send(embeds.errorEmbed(`:x: You can't rewind that much. Currently on \`${msToTime(completed)} / ${msToTime(songTime*1000)}\``))

        message.guild.voice.connection.dispatcher.destroy();
        music.play(message.guild.voice.connection, message, null, seekAmount);
        return message.channel.send(embeds.infoEmbed(`<:backward:774878788911235072> Rewinded \`${parseInt(args[0])}\` seconds.`));
    }
}

module.exports = RewindCommand;
