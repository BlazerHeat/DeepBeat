const Client = require('./client.js');
const { token, owner } = require('./config.json');
const client = new Client(token, owner);

client.on('ready', () => {
    client.user.setPresence({ activity:{ name: 'myself coded', type: 'WATCHING'}, status: 'dnd' });
    client.loadCommands();
    console.log(`Logged in as ${client.user.tag}`);
});
