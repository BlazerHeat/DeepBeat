const mongoose = require('../mongodb');

const Guild = new mongoose.Schema({
    id: String,
    prefix: { type: String, default: process.env.PREFIX },
    volume: { type: Number, default: Number(process.env.DEFAULT_VOLUME) },
    playlist: { type: Array, default: [] },
    loopqueue: { type: Boolean, default: true },
    loopsong: { type: Boolean, default: false }
});

const Guilds = mongoose.model('Guilds', Guild);

module.exports = Guilds;