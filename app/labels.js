var db = require('./db.js');
var models = require('./models.js');

var LIMIT = 20;
var labels = models.labels;

module.exports = {
	get: function (id, success, error) {
		var query = labels.select().where(labels.id.equals(id)).from(labels).toQuery();
		db.sql(query, success, error);
	},

	getByName: function (name, success, error) {
		var query = labels.select().where(labels.name.equals(name)).from(labels).toQuery();
		db.sql(query, success, error);
	},

	post: function (label, success, error) {
		var insert = labels.insert(label).toQuery();
		db.sql(insert, success, error);
	},

	list: function (page, success, error) {
		var page = page? parseInt(page) - 1 : 0;
		var query = labels.select().from(labels).limit(LIMIT).offset(page * LIMIT).toQuery();
		db.sql(query, success, error);
	}
};
