var mysql = require('mysql');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

function getConnection() {
	return mysql.createConnection({
		host			: config.host,
		user			: config.user,
		password	: config.password,
		database	: config.database
	});
};

function sql(query, success, error) {
	var connection = getConnection();
	connection.connect();
	connection.query(query.text, query.values, function(err, rows) {
	  connection.end();
	  err? error(err) : success(rows);
	});
}

module.exports = {
	sql: sql
};
