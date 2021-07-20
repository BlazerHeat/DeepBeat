const Command = require('../../modules/command');
const embeds = require('../../utils/embeds');
const msToTime = require('../../utils/msToTime');
const Users = require('../../database/models/guild');

class PingCommand extends Command {
    constructor(client){
        super(client, {
            name: 'ping',
            desc: 'Display bot\'s ping.',
            usage: '{prefix}ping',
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']
        });
    }

    run (client, message, args, prefix){ 


        return message.channel.send('<a:discord_loading:866938284483018763> Pinging...').then(async msg => {
            msg.delete();
            const ping = (msg.createdTimestamp - message.createdTimestamp).toFixed(0);
            const wsping = client.ws.ping;
            const uptime = msToTime(client.uptime);

            const then = Date.now();
            await Users.findOneAndUpdate({ id: message.guild.id }, { id: message.guild.id }, { upsert: true });
            const now = Date.now();

            const dbPing = (now - then).toFixed(0);


            return message.channel.send(embeds.loveEmbed(`:heartbeat: \`${wsping}ms\` :hourglass: \`${ping}ms\` :stopwatch: \`${uptime}\` <:mongo_db:866940013404356608> \`${dbPing}ms\``));
        });
    }
}

module.exports = PingCommand;