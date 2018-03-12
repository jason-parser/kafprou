var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'study';

	locals.data = {
		subjects: []
	};

	view.on('init', function(next) {
		
		keystone.list('SubjectCategory').model.find().exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			results.map((item) => {
				return {
					category: item.name,
				}
			});

			locals.data.subjects = results.map((item) => {
				return {
					id: item._id,
					category: item.name,
					subjects: []
				}
			});
			
			async.each(locals.data.subjects, function(item, next) {
				
				keystone.list('Subject').model.find().where('category', item.id).exec(function(err, results) {
					item.subjects = results;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});

	// Render the view
	view.render('study');
};
