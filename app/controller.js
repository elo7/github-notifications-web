/* Controllers for WEB */
var notifications = require('./notifications.js');

function home(req, resp) {
	resp.render('home', { teste: "Hello World!" });
};

function listNotifications(req, resp) {
	notifications.list(0, function(result) {
		resp.render('notifications', { 'notifications': result });
	}, function(err) {
		resp.status(500).send(err);
	});
};

module.exports = {
	home: home,
	listNotifications: listNotifications
}
