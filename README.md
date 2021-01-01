[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BlazerHeat/DeepBeat.git)

# 🤖 DeepBeat (Discord Music Bot)
[![image](https://img.shields.io/badge/language-javascript-yellow)](https://www.javascript.com/) [![image](https://img.shields.io/badge/node-%3E%3D%2012.0.0-blue)](https://nodejs.org/)
> DeepBeat is a Discord Music Bot built with discord.js and has all the features you need!

## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**
3. Your Discord ID **[Guide](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)**
4. Mongo Database URI **[Get Free Here](https://www.mongodb.com/cloud/atlas)**
5. Node.js v12.0.0 or newer **[Download](https://nodejs.org/en/)**

## 🚀 Getting Started

before starting the bot, make sure you have configured it correctly

```
git clone https://github.com/BlazerHeat/DeepBeat.git
cd DeepBeat
npm install
npm update
```

After installation finishes you can use `node main.js` to start the bot.

## ⚙️ Configuration

If deploying to Heroku make sure to create config variables `manage-app -> settings -> Reveal Config Vars (Under Config Vars)`
and the fill out Keys & Values in the following format and restart the Dyno

Open `.env` and fill out the values: (Not required if deploying to Heroku)

⚠️ **Note: Never commit or share your token or api keys publicly** ⚠️

```json
TOKEN= Your Discord Bot Token
OWNER= Your Discord ID
DATABASE_URI= MongoDB URI
PREFIX=- (any default commands' prefix you want)
DEFAULT_VOLUME=0.7 (default music volume should be between 0 - 1)
YOUTUBE_TOKEN= YouTube v3api Token
```

## 📝 Features & Commands

> Note: The default prefix for commands is `-`

#### 🎵 Music commands
| Command                  | Description                                                                                                               | Usage                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| -play| Play song through link, query or playlist| -play [Youtube link or Query]|
| -add| Add songs to Guild's playlist| -add [Youtube link or Query]|
| -clear| Clears Guilds playlist| -clear|
| -goto| skip to a certain song in playlist| -goto [Song Number]|
| -leave| Makes bot leave the voice channel| -leave|
| -nowplaying | Display currently playing song | -nowplaying|
| -pause| Pause the current playing song| !pause|
| -resume| Resume the current paused song| -resume|
| -remove| Removes song from playlist| -remove [Song Number]|
| -queue| Displays Guilds playlist | -queue|
| -replay| Replays currently playing song| -replay|
| -skip| Skip the current playing song| -skip|
| -search| Search songs on YouTube, then play or add them to Guild's playlist| -search [Query]|
| -volume| Changes msuic player's volume|-volume [1 - 100]|
| -rewind| Rewind some amount of seconds in music stream| -rewind [amount in seconds]|
| -forward| Skip some amount of seconds in music stream| -forward [amount in seconds]|

#### 💡 General commands
| Command                  | Description                                                                                                               | Usage                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| -help| Sends you list of commands| -help [command name]|
| -invite| Gives all bot realted links|-invite|
| -ping| Display bot ping| -ping|
| -stats| Gives all bot's system realted information| -stats|

#### ✏️ Settings commands
| Command                  | Description                                                                                                               | Usage                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| -setprefix| Changes the prefix used to address bot| -setprefix [New Prefix]|
| -reset| Used to reset bot settings|-reset|
| -loopqueue| Enable or Disable playlist looping| -loopqueue|
| -loopsong| Enable or Disable song looping| -loopsong|
