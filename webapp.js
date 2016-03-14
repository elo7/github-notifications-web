var express = require('express');
var hbs = require('express-hbs');
var fs = require('fs');
require('./app/helpers.js');

var controller = require('./app/controller.js');
var api = require('./app/api.js');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var app = express();
/* Template definitions */
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/main.hbs',
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

/* Routing Config */
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', controller.home);

app.get('/notifications', controller.listNotifications);
app.get('/notifications/label/:labelId', controller.filterNotifications);

app.get('/labels', controller.listLabels);

/* API Routes */
app.post('/api/notification', api.postNotification);
app.get('/api/notification/list', api.listNotification);
app.get('/api/notification/:id', api.notification);

/* Server */
app.listen(config.port, function() {
  console.log('Github notifications web listening at %s', config.port);
});
