	/* Controllers for API */

function toNotification(violations, label) {
	var notifications = [];
	for(var i = 0; i < violations.length; i++) {
		var violation = violations[i];
		var violatedRules = violation["violatedRules"];
		for(var j = 0; j < violatedRules.length; j++) {
			notifications.push({
				label_id: label,
				violation: violatedRules[j].message,
				pull_request: violation.title,
				link: violation.link
			});
		}
	}
	return notifications;
}

function search(data, label) {
	for(var l in data) {
		if(data[l].name == label) {
			return data[l].id;
		}
	}
}

module.exports = {
	format: function (data, labelsDictionary) {
		var notifications = [];

		for(var label in data) {
			var violations = data[label];
			var labelId = search(labelsDictionary, label);
			if(violations.length > 0 && labelId) {
				var result = toNotification(violations, labelId);
				notifications = notifications.concat(result);
			}
		}
		return notifications
	}
};
