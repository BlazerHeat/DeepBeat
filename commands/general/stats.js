const Command = require('../../modules/command');
const { MessageEmbed } = require('discord.js');
const os = require('os')

class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            desc: 'Gives all bot\'s system realted information.',
            usage: '{prefix}stats',
            aliases: ['info', 'status'],
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
        });
    }

    run(client, message, args, prefix) {

        const memoryUsage = os.totalmem() - os.freemem();
        const memoryUsagePercent = ((memoryUsage/os.totalmem())*100).toFixed(2);
        const cpu = os.cpus()[0].model.split(' ').slice(0, 3).join(' ');
        const platform = os.platform().replace('win32', 'Windows');
        const Thresold = 90;

        const stats = new MessageEmbed()
            .setAuthor(`${client.user.tag} [${client.user.id}]`, client.user.displayAvatarURL())
            .setDescription(`**${memoryUsagePercent}% Memory usage \`${(memoryUsage/(1024*1024)).toFixed(0)} MB\`, ${memoryUsagePercent >= Thresold ? "UnHealthy" : "Healthy"}! <a:health:693043046677348474>**`)
            .addField(`Guilds Streaming :shield: `, `\`${this.client.guilds.cache.size}\``, true)
            .addField(`Users Serving :busts_in_silhouette: `, `\`${this.client.users.cache.size}\``, true)
            .addField(`Channels Scanning :file_folder: `, `\`${this.client.channels.cache.filter(x=>x.type==='text').size}\``, true)
            .addField('CPU <:CPU:793742666759929876>', `\`${cpu}\``, true)
            .addField('TOTAL MEM <:RAM:793742685731028992>', `\`${(os.totalmem()/(1024*1024*1024)).toFixed(0)} GB\``, true)
            .addField('PLATFORM <:platform:793743280063774720>', `\`${platform}\``, true);
            memoryUsagePercent >= Thresold ? stats.setColor(0xFF0000) : stats.setColor(0x00FF78);
        return message.channel.send(stats);

    }
}

module.exports = InviteCommand;