const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const msToTime = require('../../utils/msToTime.js');

class PingCommand extends Command {
    constructor(client){
        super(client, {
            name: 'ping',
            desc: 'Display bot\'s ping.',
            usage: '{prefix}ping',
            example: '{prefix}ping',
            clientPermissions: ['USE_EXTERNAL_EMOJIS']
        });
    }

    run (client, message, args, prefix){
        return message.channel.send('<a:pinging:715142364074737736> Pinging...').then(msg => {
            msg.delete();
            const ping = (msg.createdTimestamp - message.createdTimestamp).toFixed(0);
            const wsping = client.ws.ping;
            const uptime = msToTime(client.uptime);

            return message.channel.send(embeds.loveEmbed(`:heartbeat: \`${wsping}ms\` :hourglass: \`${ping}ms\` :stopwatch: \`${uptime}\``));
        });
    }
}

module.exports = PingCommand;