const fs = require('fs');
const defaultPrefix = process.env.PREFIX;
const Guilds = require('../database/models/guild.js');
const embeds = require('../utils/embeds.js');
const permissions = require('../utils/permissions.js');

async function getPrefix(guild){
    if(!guild) return defaultPrefix;
    
    const guildInfo = await Guilds.findOne({ id: guild.id });
    if(guildInfo) {
        const { prefix } = guildInfo;
        return prefix;
    }
    else return defaultPrefix;
}

function missingPermissions(array){
    let text = '';
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(i === array.length-1) text += `\`${permissions[element]}\``;
        else text += `\`${permissions[element]}\`,`;
    }
    return text;
}


module.exports = (client) => {

    fs.readdir('./commands', (err, folders) => {
        if(err) return console.error(err);
        folders.forEach(folder => {
            if(folder.endsWith('.js')){
                const CommandClass = require(`../commands/${folder}`);
                const command = new CommandClass(client);
                client.commands.set(command.name, command);
                if(command.aliases && command.aliases.length !== 0){
                    command.aliases.forEach(alia => {
                        client.aliases.set(alia, command);
                    });
                }
                console.log(`${folder} command loaded`)
            }
            else {
                fs.readdir('./commands/'+folder, (err, files) => {
                    if(err) return console.error(err);
                    files.forEach(file => {
                        const CommandClass = require(`../commands/${folder}/${file}`);
                        const command = new CommandClass(client);
                        client.commands.set(command.name, command);
                        if(command.aliases && command.aliases.length !== 0){
                            command.aliases.forEach(alia => {
                                client.aliases.set(alia, command);
                            });
                        }
                    });
                });
                console.log(`${folder} commands loaded`)
            }
        });
    });

    client.on('message', async (message) => {
        if(message.author.bot) return;
        const prefix = await getPrefix(message.guild);
        if(!message.content.startsWith(prefix)) return;

        let cont = message.content.slice(prefix.length).split(' ');
        if(!cont[0]) return;

        let commandName = cont[0].toLowerCase();
        let args = cont.slice(1);

        let command = client.commands.get(commandName) || client.aliases.get(commandName);
        if(command){
            if(command.ownerOnly && message.author.id !== client.owner) return message.channel.send(embeds.errorEmbed(':x: Owner only command'));
            if(command.guildOnly && !message.guild) return message.channel.send(embeds.errorEmbed(':x: Guild only command'));
            if(message.channel.type !== 'dm'){
                let neededClientPermissons = command.clientPermissions;
                let botPermissions = message.guild.me.permissions;

                let botMissingPermissions = botPermissions.missing(neededClientPermissons);

                if(botMissingPermissions.some(x => x === "EMBED_LINKS")) return message.channel.send('I need Embed Links permission to work.');

                if (botMissingPermissions.length !== 0) {
                    return message.channel.send(embeds.errorEmbed(`:x: Before Using \`${command.name}\` Command, **I** need the Following Permissions:\n\`${missingPermissions(botMissingPermissions)}\``));
                }

                let neededUserPermissons = command.userPermissions;
                let userPermissions = message.member.permissions;

                let userMissingPermissions = userPermissions.missing(neededUserPermissons);
                if (message.author.id !== client.owner && userMissingPermissions.length !== 0) {
                    return message.channel.send(embeds.errorEmbed(`:x: Before Using \`${command.name}\` Command, **YOU** need the Following Permissions:\n\`${missingPermissions(userMissingPermissions)}\``));
                }
            }
            try {
                command.run(client, message, args, prefix);
            } catch (err) {
                message.channel.send(embeds.errorEmbed(':x: Error occured while executing the command: '+err.toString()))
            }
        } else {
            return message.channel.send(embeds.errorEmbed(':x: Command not found!'));
        }

    });

    client.on('message', async (message) => {
        if(message.content.toLowerCase() === '<@!761475247680520193> prefix' || message.content.toLowerCase() === '<@761475247680520193> prefix'){
            if(message.channel.type === "dm") return message.channel.send(embeds.loveEmbed(`Prefix for DM channel is \`${defaultPrefix}\``));
            const prefix = await getPrefix(message.guild);
            return message.channel.send(embeds.loveEmbed(`Prefix for this server is \`${prefix}\``));
        }
    });
};

