const voiceLeaves = new Map();

module.exports = (client) => {

    client.on('voiceStateUpdate', (oldState, newState) => {
        let guild = newState.guild;

        if (!guild || !guild.voice || !guild.voice.connection) return;
        const { channel, dispatcher } = guild.voice.connection;

        if (channel.members.filter(x => !x.user.bot).size === 0 && !voiceLeaves.has(guild.id)) {
            if (!dispatcher) return;
            dispatcher.pause();
            // Also set the timeout to leave the voiceChannel in the voiceLeaves map we defined before
            voiceLeaves.set(guild.id, setTimeout(() => {
                if (dispatcher) dispatcher.destroy();
                channel.leave();
                // Make sure that also cleans our Map
                voiceLeaves.delete(guild.id);
            }, 60000)) // 1minutes
        }

        if (channel.members.filter(x => !x.user.bot && !x.voice.deaf).size !== 0 && voiceLeaves.has(guild.id)) {
            clearTimeout(voiceLeaves.get(guild.id));
            voiceLeaves.delete(guild.id);
            if (dispatcher) dispatcher.resume();
        }

    });

}