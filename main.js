require('dotenv').config();
const { SHOW_DBL_STATS } = require('./dblConfig.json');

const Client = require('./client.js');
const client = new Client(process.env.TOKEN, process.env.OWNER);

client.on('ready', () => {
    client.user.setPresence({ activity: { name: `Beats with ${process.env.PREFIX}p`, type: 'PLAYING'}, status: 'online' });
    client.loadCommands();
    client.autoLeaveVoice();
    if(SHOW_DBL_STATS) client.showDblStats();
    console.log(`Logged in as ${client.user.tag}`);
});
