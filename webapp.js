var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var controller = require('./app/controller.js');
var api = require('./app/api.js');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

/* Template definitions */

hbs.registerPartials(__dirname + '/views/partials');

var app = express();
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use('/assets', express.static(__dirname + '/assets'));

/* Routing Config */
app.get('/', controller.home);
app.get('/notifications', controller.listNotifications);

app.post('/api/notification', api.postNotification);
app.get('/api/notification/list', api.listNotification);
app.get('/api/notification/:id', api.notification);

/* Server */
app.listen(config.port, function() {
  console.log('Github notifications web listening at %s', config.port);
});
