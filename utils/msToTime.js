module.exports = (duration) => {
        let totalSeconds = (duration / 1000);

        let days = Math.floor(totalSeconds / (24 * 60 * 60));
        totalSeconds -= days * 24 * 60 * 60;

        let hours = Math.floor(totalSeconds / (60 * 60));
        totalSeconds -= hours * 60 * 60;

        let minutes = Math.floor(totalSeconds / 60);
        totalSeconds -= minutes * 60;

        let seconds = totalSeconds;

        if (days == 0 && hours == 0) return `${minutes}m : ${seconds.toFixed(0)}s`;
        else if (days == 0 && hours != 0) return `${hours}h : ${minutes}m : ${seconds.toFixed(0)}s`;
        else return `${days}d : ${hours}h : ${minutes}m : ${seconds.toFixed(0)}s`;
}