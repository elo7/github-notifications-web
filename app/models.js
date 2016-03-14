var sqlBuilder = require('sql');

sqlBuilder.setDialect('mysql');

var notifications = sqlBuilder.define({
	name: 'notification',
	columns: ['id', 'label_id', 'violation', 'pull_request', 'link', 'created_at']
});

var labels = sqlBuilder.define({
	name: 'label',
	columns: ['id', 'name']
});

module.exports = {
	notifications: notifications,
	labels: labels
}
