class Command {
    constructor(client, { 
        name = null,
        desc = null,
        aliases = [],
        usage = null,
        example = null,
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
        this.usage = usage;
        this.example = example;
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