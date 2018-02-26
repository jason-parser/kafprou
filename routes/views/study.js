var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'study';

	locals.data = {
		schedules: []
	};

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Schedule').model.find({});

		q.exec(function (err, results) {
			locals.data.schedules = schedules;
			next(err);
		});
	});

	// Render the view
	view.render('study');
};