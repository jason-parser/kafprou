var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'science';

	locals.data = {
		science: []
	};

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Science').model.find({});

		q.exec(function (err, results) {
			locals.data.science = results;
			next(err);
		});
	});

	// Render the view
	view.render('science');
};
