module.exports = { timeSince, mcTimeToRealTime, formattedTime };

function timeSince(date) {

	const seconds = Math.floor((new Date() - date) / 1000);

	let interval = seconds / 31536000;

	if (interval > 1) {
	  return Math.floor(interval) + ' years';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
	  return Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;
	if (interval > 1) {
	  return Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;
	if (interval > 1) {
	  return Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
	  return Math.floor(interval) + ' minutes';
	}
	return Math.floor(seconds) + ' seconds';
}

function mcTimeToRealTime(time) {
	gameTime = time;
	hours = Math.round(gameTime / 1000 + 6);
	minutes = Math.round((gameTime % 1000) * 60 / 1000);
	ampm = 'AM';
	if (hours >= 12) {
		hours -= 12; ampm = 'PM';
	}

	if (hours >= 12) {
		hours -= 12; ampm = 'AM';
	}

	if (hours == 0) hours = 12;

	mm = '0' + minutes;
	mm = mm.substring(mm.length - 2, mm.length);

	return hours + ':' + mm + ' ' + ampm;
}

function formattedTime() {
	const date = new Date();
	return date.toLocaleTimeString();
}