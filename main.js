require('dotenv').config();
const Client = require('./client.js');
const client = new Client(process.env.TOKEN, process.env.OWNER);

client.on('ready', () => {
    client.user.setPresence({ activity: { name: "myself coded", type: "WATCHING"}, status: "dnd" });
    client.loadCommands();
    client.autoLeaveVoice();
    console.log(`Logged in as ${client.user.tag}`);
});
