const fs = require('fs');
const { defaultPrefix } = require('../config.json');
const Guilds = require('../database/models/guild.js');
const embeds = require('../utils/embeds.js');
const permissions = require('../utils/permissions.js');

async function getPrefix(guild){
    if(!guild) return defaultPrefix;
    else return new Promise((resolve, reject) => {
            Guilds.findOne({ id: guild.id }, (err, res) => {
                if(err) return reject(err);
                else if (res) return resolve(res.prefix || defaultPrefix);
                else return resolve(defaultPrefix);
        });
    });
}

function missingPermissions(array){
    let text = '';
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(i == array.length-1) text += `\`${permissions[element]}\``;
        else text += `\`${permissions[element]}\`,`;
    }
    return text;
}


module.exports.loadCommands = (client) => {

    fs.readdir('./commands', (err, folders) => {
        if(err) return console.error(err);
        folders.forEach(folder => {
            if(folder.endsWith('.js')){
                const CommandClass = require(`../commands/${folder}`);
                const command = new CommandClass(client);
                client.commands.set(command.name, command);
                console.log(`${command.name} Loaded!`);
                if(command.aliases && command.aliases.length !== 0){
                    command.aliases.forEach(alia => {
                        client.aliases.set(alia, command);
                    });
                }
            }
            else {
                fs.readdir('./commands/'+folder, (err, files) => {
                    if(err) return console.error(err);
                    files.forEach(file => {
                        const CommandClass = require(`../commands/${folder}/${file}`);
                        const command = new CommandClass(client);
                        client.commands.set(command.name, command);
                        console.log(`${command.name} Loaded!`);
                        if(command.aliases && command.aliases.length !== 0){
                            command.aliases.forEach(alia => {
                                client.aliases.set(alia, command);
                            });
                        }
                    });
                });
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

            return command.run(client, message, args, prefix);
        } else {
            return message.channel.send(embeds.errorEmbed(':x: Command not found!'));
        };

    });

    return;
};

