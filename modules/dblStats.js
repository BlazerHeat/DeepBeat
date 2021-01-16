const DBL = require("dblapi.js");
const { DBL_KEY } = require('../dblConfig.json');

module.exports = (client) => {
  const dbl = new DBL(DBL_KEY, client);

  client.setInterval(() => {
    dbl.postStats(client.guilds.cache.size).catch(console.error);
  }, 1800000);
};
