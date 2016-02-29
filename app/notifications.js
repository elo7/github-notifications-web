var mysql = require('mysql');
var sqlBuilder = require('sql');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var LIMIT = 20;

sqlBuilder.setDialect('mysql');
var notifications = sqlBuilder.define({
	name: 'notifications',
	columns: ['id', 'label', 'violation']
});

function getConnection() {
	return mysql.createConnection({
		host			: config.host,
		user			: config.user,
		password	: config.password,
		database	: config.database
	});
};

function getNotification(id, success, error) {
	var connection = getConnection();
	connection.connect();
	var query = notifications.select().where(notifications.id.equals(id)).from(notifications).toQuery();
	connection.query(query.text, query.values, function(err, rows) {
	  connection.end();
	  err? error(err) : success(rows[0]);
	});
};

function postNotification(notification, success, error) {
	var connection = getConnection();
	connection.connect();
	var insert = notifications.insert(notification).toQuery();
	connection.query(insert.text, insert.values, function(err, rows) {
	  connection.end();
	  err? error(err) : success(rows[0]);
	});
};

function listNotification(page, success, error) {
		var connection = getConnection();
		connection.connect();
		var query = notifications.select().from(notifications).limit(LIMIT).offset(page * LIMIT).toQuery();
		connection.query(query.text, query.values, function(err, rows) {
		  connection.end();
		  err? error(err) : success(rows);
		});
};

module.exports = {
	get: getNotification,
	post: postNotification,
	list: listNotification
};
