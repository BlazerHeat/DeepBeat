const mongoose = require('../mongodb');
const { defaultPrefix, defaultVolume } = require('../../config.json');

const Guild = new mongoose.Schema({
    id: String,
    prefix: { type: String, default: defaultPrefix },
    volume: { type: Number, default: defaultVolume },
    playlist: { type: Array, default: [] },
    loopqueue: { type: Boolean, default: true },
    loopsong: { type: Boolean, default: false }
});

const Guilds = mongoose.model('Guilds', Guild);

module.exports = Guilds;