module.exports = (duration) => {
        let totalSeconds = (duration / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;


        if(days == 0 && hours == 0) return `${minutes}m : ${seconds.toFixed(0)}s`;
        else if (days == 0 && hours != 0) return `${hours}h : ${minutes}m : ${seconds.toFixed(0)}s`;
        else return `${days}d : ${hours}h : ${minutes}m : ${seconds.toFixed(0)}s`;

        // if (hours != 0 && days == 0) return `${hours}h : ${minutes}m : ${seconds.toFixed(0)}s`;
        // else if (days != 0) return `${days}d : ${hours}h : ${minutes}m : ${seconds.toFixed(0)}s`;
        // else return `${minutes}m : ${seconds.toFixed(0)}s`;
}