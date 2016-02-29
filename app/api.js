/* Controllers for API */
var notifications = require('./notifications.js');

function notification(req, resp) {
	notifications.get(req.params.id, function(result) {
		resp.json(result);
	}, function(err) {
		resp.status(500).send(err);
	});
}

function postNotification(req, resp) {
	var notification = {
		label: "hands",
		violation: "Not updated"
	};
	notifications.post(notification, function(result) {
		resp.status(200).send();
	}, function(err) {
		resp.status(500).send(err);
	});
}

function listNotification(req, resp) {
	notifications.list(0, function(result) {
		resp.json(result);
	}, function(err) {
		resp.status(500).send(err);
	});
}

module.exports = {
	notification: notification,
	postNotification: postNotification,
	listNotification: listNotification
};
