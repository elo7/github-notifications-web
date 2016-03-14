	/* Controllers for API */
var notifications = require('./notifications.js');
var labels = require('./labels.js');
var formatter = require('./formatter.js');

module.exports = {
	notification: function (req, resp) {
		notifications.get(req.params.id, function(result) {
			resp.json(result);
		}, function(err) {
			resp.status(500).send(err);
		});
	},

	postNotification: function (req, resp) {
		notifications.save(JSON.parse(req.body), function(result) {
			resp.status(200).send();
		}, function(err) {
			resp.status(500).send(err);
		});
	},

	listNotification: function (req, resp) {
		notifications.list(0, function(result) {
			resp.json(result);
		}, function(err) {
			resp.status(500).send(err);
		});
	},

	webhook: function(req, resp) {
		labels.list(0, function(labels) {
			var formattedData = formatter.format(req.body, labels);
			notifications.save(formattedData, function() {
				resp.status(200).send();
			}, function(err) {
				console.log(err);
				resp.status(500).send();
			});
		}, function() {
			resp.status(500).send();
		});
	}
};
