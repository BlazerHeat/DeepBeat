const mongoose = require('../mongodb');
const { defaultPrefix } = require('../../config.json');

const Guild = new mongoose.Schema({
    id: String,
    prefix: { type: String, default: defaultPrefix },
    playlist: { type: Array, default: [] }
});

const Guilds = mongoose.model('Guilds', Guild);

module.exports = Guilds;