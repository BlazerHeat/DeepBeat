const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const time = require('../../utils/time.js');

class PingCommand extends Command {
    constructor(client){
        super(client, {
            name: 'ping',
            desc: ''
        })
    }

    run (client, message, args, prefix){
        return message.channel.send('Pinging ...').then(msg => {
            msg.delete();
            const ping = (msg.createdTimestamp - message.createdTimestamp).toFixed(0);
            const wsping = client.ws.ping;
            const uptime = time.mstoTime(client.uptime)

            return message.channel.send(embeds.loveEmbed(`:heartbeat: \`${wsping}ms\` :hourglass: \`${ping}ms\` :stopwatch: \`${uptime}\``));
        });
    }
}

module.exports = PingCommand;