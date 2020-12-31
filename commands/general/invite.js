const Command = require('../../modules/command');
const { MessageEmbed } = require('discord.js');

class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            desc: 'Gives all bot realted links.',
            usage: '{prefix}invite',
            aliases: ['links', 'link'],
            clientPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
        });
    }

    run(client, message, args, prefix) {
        const invite = new MessageEmbed()
            .setAuthor('All Links!', client.user.displayAvatarURL())
            .setDescription(`
                [Invite me](https://discord.com/api/oauth2/authorize?client_id=761475247680520193&permissions=3492096&scope=bot)
                [Support Server](https://discord.gg/gTkmen2)
                [Github Repo](https://github.com/BlazerHeat/DeepBeat)
                Discord Bot List - comming soon
                Website - comming soon
            `)
            .setColor('#FF087F');
        return message.channel.send(invite);
    }
}

module.exports = InviteCommand;