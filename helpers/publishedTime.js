const publishedTime = (time) => {
    let now = new Date;
    time = new Date(time);
    let seconds = Math.floor((now - time) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }

    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    } else {
        return " less than a minute ago"
    }
}

module.exports = publishedTime;