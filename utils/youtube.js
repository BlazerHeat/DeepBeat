const Youtube = require('youtube-node');
const youtube = new Youtube();
const { youtubeToken } = require('../config.json');

youtube.setKey(youtubeToken);

module.exports = {
    search: (query, maxResults = 10) => {
        return new Promise((resolve, reject) => {
            youtube.search(query, maxResults, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        });
    }
};