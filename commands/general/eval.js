const Command = require('../../modules/command');
const embeds = require('../../utils/embeds.js');
const { MessageEmbed } = require('discord.js');
const token = process.env.TOKEN;
const util = require('util');

function clean(text){

    if (typeof(text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(token, 'Bot Token');
    return text;
}

function clean2(text){
    if (typeof(text) === "string")
        return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(token, 'Bot Token');
    else
        return text;
}
function length(text){
    if(text.length > 1015) return text.substring(0, 1015);
    else return text;
}

class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            desc: 'This Command is Used to Evaluate Something in the Code, (This Command is Owner Locked!).',
            usage: '{prefix}eval [code block]',
            example: '{prefix}eval 2+2 //output: 4',
            ownerOnly: true,
            clientPermissions: ['USE_EXTERNAL_EMOJIS']
        });
    }

    run(client, message, args, prefix) {
        if(!args[0]) return message.channel.send(embeds.errorEmbed(`Please specify what i have to Evaluate.\nUsage: ${prefix}eval [code]`));
        const code = args.join(" ").replace('```js', '').replace('```', '').replace('```', '');
        try {
            let evaled = eval(code);

            let embed = new MessageEmbed()
                .setAuthor(`[!] Evaluated [!]`, client.user.displayAvatarURL())
                .addField('INPUT: :inbox_tray:', '```js\n'+length(code)+'```')
                .addField('OUTPUT: :outbox_tray:', '```js\n'+length(clean(evaled))+'```')
                .addField('TYPE: :bulb:', '```cs\n\''+typeof(evaled)+'\'```')
                .setColor(0x00FF0F);
            return message.channel.send(embed);
        } catch (err) {
            let embed = new MessageEmbed()
                .setAuthor(`[!] ERROR [!]`, client.user.displayAvatarURL())
                .addField('INPUT: :inbox_tray:', '```js\n'+length(code)+'```')
                .addField('OUTPUT: :outbox_tray:', '```js\n'+length(clean2(err))+'```')
                .addField('TYPE: :bulb:', '```cs\n\''+typeof(evaled)+'\'```')
                .setColor(0xFF0000);
            return message.channel.send(embed);
        }   
    }
}

module.exports = EvalCommand;