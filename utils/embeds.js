const { MessageEmbed } = require('discord.js');

let embed = new MessageEmbed();

module.exports = {

    errorEmbed: (text = '-') => {
        embed.setColor('#ff3000');
        embed.setDescription(text);
        return embed;
    },

    infoEmbed: (text = '-') => {
        embed.setColor('#0064FF');
        embed.setDescription(text);
        return embed;
    },

    successEmbed: (text = '-') => {
        embed.setColor('#08FF00');
        embed.setDescription(text);
        return embed;
    },

    loveEmbed: (text = '-') => {
        embed.setDescription(text);
        embed.setColor('#FF087F');
        return embed;
    }

}