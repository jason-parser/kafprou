var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'method';

	locals.data = {
		methods: []
	};

	view.on('init', function (next) {

		keystone.list('MethodCategory').model.find().exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			results.map((item) => {
				return {
					category: item.name,
				}
			});

			locals.data.methods = results.map((item) => {
				return {
					id: item._id,
					category: item.title,
					methods: []
				}
			});

			async.each(locals.data.methods, function (item, next) {

				keystone.list('MethodBlock').model.find().where('category', item.id).exec(function (err, results) {
					item.methods = results;
					next(err);
				});

			}, function (err) {
				next(err);
			});

		});

	});

	// Render the view
	view.render('method');
};
