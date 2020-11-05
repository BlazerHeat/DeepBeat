class Command {
    constructor(client, { 
        name = " ",
        desc = " ",
        aliases = [],
        guildOnly = false,
        ownerOnly = false,
        userPermissions = [],
        clientPermissions = []
    })
    {
        this.client = client;
        this.name = name;
        this.desc = desc;
        this.aliases = aliases;
        this.guildOnly = guildOnly;
        this.ownerOnly = ownerOnly;
        this.userPermissions = userPermissions;
        this.clientPermissions = clientPermissions;
    }

    run(client, message, args, prefix){
        return message.channel.send("Empty Command!");
    }
}

module.exports = Command;