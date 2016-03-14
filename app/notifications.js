var db = require('./db.js');
var models = require('./models.js');
var LIMIT = 20,
	notifications = models.notifications,
	labels = models.labels;

module.exports = {
	get: function (id, success, error) {
		var query = notifications.select().where(notifications.id.equals(id)).from(notifications).toQuery();
		db.sql(query, success, error);
	},

	post: function (notification, success, error) {
		var insert = notifications.insert(notification).toQuery();
		db.sql(insert, success, error);
	},

	list: function (page, success, error) {
		var page = page? parseInt(page) - 1 : 0;
		var query = notifications
								.from(notifications.leftJoin(labels).on(notifications.label_id.equals(labels.id)))
								.limit(LIMIT)
								.offset(page * LIMIT).toQuery();
		db.sql(query, success, error);
	},

	filter: function (labelId, page, success, error) {
		var page = page? parseInt(page) - 1 : 0;
		var query = notifications
								.from(notifications.leftJoin(labels).on(notifications.label_id.equals(labels.id)))
								.where(labels.id.equals(labelId))
								.limit(LIMIT).offset(page * LIMIT).toQuery();
		db.sql(query, success, error);
	}
};
