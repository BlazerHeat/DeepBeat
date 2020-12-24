const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const { MessageEmbed } = require('discord.js');
const { version } = require('../../package.json');

class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            desc: 'Sends you list of commands.',
            usage: '{prefix}help [command name]',
            example: '{prefix}help play',
            clientPermissions: ['USE_EXTERNAL_EMOJIS']
        });
    }

    run(client, message, args, prefix) {
        const help = new MessageEmbed();
        if (!args[0]) {
            help.setTitle(`${client.user.username} Help`)
                .setDescription('`' + prefix + 'help <command>` to see more information about that command.')
                .addField(":green_book: GENERAL", `\`help, invite, ping\``)
                .addField(":musical_note: MUSIC", '`add, clear, goto, leave, nowplaying, pause, play, queue, remove, replay, resume, search, skip, rewind, volume, forward`')
                .addField(":pencil2: SETTINGS", '`loopqueue, loopsong, setprefix, reset`');
        }
        else {
            let commandName = args[0].toLowerCase();
            if (!client.commands.has(commandName) && !client.aliases.has(commandName)) return message.channel.send(embeds.errorEmbed(':x: Command not found.'))
            let command = client.commands.get(commandName) || client.aliases.get(commandName);

            if(command.guildOnly) command.name += " (Guild Only)";
            else if(command.ownerOnly) command.name += " (Owner Only)";

            help.setTitle(`Command - ${command.name}`)
                .setDescription(command.desc.replace('{prefix}', prefix))
                .addField('Usage:', '```' + command.usage.replace('{prefix}', prefix) + '```')
                .addField('Example:', '```' + command.example.replace('{prefix}', prefix) + '```')
                .addField('Aliases:', command.aliases[0] ? `\`${command.aliases.join(', ')}\`` : '`None`');
        }
        help.setFooter(`version: ${version}`, client.user.displayAvatarURL()).setColor('#FF087F');
        return message.channel.send(help);
    }
}

module.exports = HelpCommand;