var hbs = require('express-hbs');

var padLeft = function(date) {
	return ("0" + date).slice(-2);
};

hbs.registerHelper('formatDate', function(date, options) {
	var fulldate = padLeft(date.getDate()) + "/" + padLeft(date.getMonth() + 1) + "/" + padLeft(date.getFullYear());
	var fullTime = padLeft(date.getHours()) + ":" + padLeft(date.getMinutes()) + ":" + padLeft(date.getSeconds());
  return new hbs.SafeString(
    fulldate + " " + fullTime
  );
});
