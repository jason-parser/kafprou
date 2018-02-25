var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		teachers: [],
		subjects: []
	};

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Teacher').model.find({});

		q.exec(function (err, results) {
			locals.data.teachers = results;
			next(err);
		});
	});

	view.on('init', function (next) {

		var q = keystone.list('Subject').model.find({});

		q.exec(function (err, results) {
			locals.data.subjects = results;
			next(err);
		});
	});


	// Render the view
	view.render('index');
};
