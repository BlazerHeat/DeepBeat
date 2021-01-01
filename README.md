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
and the fill out value in the following format

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

still typing...
