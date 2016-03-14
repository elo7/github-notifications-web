/* Controllers for WEB */
var notifications = require('./notifications.js'),
	labels = require('./labels.js');

function home(req, resp) {
	resp.render('home', { teste: "Hello World!" });
};

function listNotifications(req, resp) {
	notifications.list(req.query.page, function(result) {
		resp.render('notifications', { 'notifications': result });
	}, function(err) {
		resp.status(500).send(err);
	});
};

function listLabels(req, resp) {
	labels.list(req.query.page, function(result) {
		resp.render('labels', { 'labels': result });
	}, function(err) {
		resp.status(500).send(err);
	});
};

function filterNotifications(req, resp) {
	notifications.filter(req.params.labelId, req.query.page, function(result) {
		resp.render('notifications', { 'notifications': result });
	}, function(err) {
		resp.status(500).send(err);
	});
};

module.exports = {
	home: home,
	listNotifications: listNotifications,
	listLabels: listLabels,
	filterNotifications: filterNotifications
}
