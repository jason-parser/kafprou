var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

var routes = {
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {
	app.get('/', routes.views.index);
	app.get('/study', routes.views.study);
	app.get('/method', routes.views.method);
	app.get('/science', routes.views.science);
};
