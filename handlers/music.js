const Guilds = require('../database/models/guild.js');
const embeds = require('../utils/embeds.js');
const ytdl = require('ytdl-core');

let Playlist = new Map();
let Seek = new Map();

async function reloadPlaylist(id) {
    if(!Playlist.get(id)) Playlist.set(id, []);
    let data = await Guilds.findOne({ id: id });
    data.playlist.forEach(song => {
        Playlist.get(id).push(song);
    });
    return;
}


module.exports = {
    play: async (connection, message, song, seekAmount = 0) => {

        Seek.set(message.guild.id, seekAmount);

        const guild = await Guilds.findOne({ id: message.guild.id });
        if(!song){
            if(!Playlist.get(message.guild.id) || Playlist.get(message.guild.id).length == 0){
                song = guild.playlist[0];
                await reloadPlaylist(message.guild.id);
            } else {
                song = Playlist.get(message.guild.id)[0];
            }
        }

        
        const dispatcher = connection.play(ytdl(song.url, { quality: `highestaudio`, filter: () => ['251'], highWaterMark: 1 << 25 }), { volume: guild.volume, seek: seekAmount });

        dispatcher.on('start', () => {
            if(seekAmount == 0) return message.channel.send(embeds.infoEmbed('**:notes: Playing:** `' + song.title + '`'));
        });

        dispatcher.on('finish', async () => {
            Seek.set(message.guild.id, 0);

            const { loopsong, loopqueue } = await Guilds.findOne({ id: message.guild.id });

            if(loopsong){
                return require('./music').play(connection, message);
            } else if (loopqueue){
                Playlist.get(message.guild.id).shift();
                if(Playlist.get(message.guild.id).length == 0) await reloadPlaylist(message.guild.id);
                return require('./music').play(connection, message);
            } else {
                Playlist.get(message.guild.id).shift();
                connection.channel.leave();
                return message.channel.send(embeds.infoEmbed(':musical_note: Song completed!'));
            }

        });

    },
    createPlaylist: (id) => {
        if(!Playlist.get(id)) Playlist.set(id, []);
    },
    playList: (id) => {
        return Playlist.get(id);
    },
    goto: async (id, songNumber) => {
        require('./music').refreshPlaylist(id);
        await reloadPlaylist(id);
        Playlist.get(id).splice(0, songNumber-1);
    },
    remove: (id, song) => {
        if(!Playlist.get(id)) return;
        for(let i = 0; i < Playlist.get(id).length; i++){
            if(Playlist.get(id)[i].url == song.url){
                Playlist.get(id).splice(i, 1);
                break;
            }
        }
    },
    add: (id, song) => {
        if(Playlist.get(id)) Playlist.get(id).push(song);
        else Playlist.set(id, [song]);
    },
    getSeek: (id) => {
        return Seek.get(id) ? Seek.get(id) : 0;
    },
    refreshPlaylist:(id) => {
        return Playlist.set(id, []);
    },
    resetAndAdd: (id, song) => {
        require('./music').refreshPlaylist(id);
        require('./music').add(id, song);
        return;
    },
    getSongNumber: async (id, song) => {
        let guild = await Guilds.findOne({ id: id });
        for (let i = 0; i < guild.playlist.length; i++) {
            const _song = guild.playlist[i];
            if(song.url == _song.url) return (i+1);
        }
    },
    forceSkip: (id) => {
        return Playlist.get(id).shift();
    }
}