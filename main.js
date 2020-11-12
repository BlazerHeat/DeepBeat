const Client = require('./client.js');
const { token, owner, clientPresence } = require('./config.json');
const client = new Client(token, owner);

client.on('ready', () => {
    client.user.setPresence(clientPresence);
    client.loadCommands();
    client.autoLeaveVoice();
    console.log(`Logged in as ${client.user.tag}`);
});
