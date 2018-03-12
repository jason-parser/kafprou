var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';

	locals.data = {
		teachers: [],
		main: [],
		subjects: []
	};

	view.on('init', function (next) {

		var q = keystone.list('MainPage').model.find({});

		q.exec(function (err, results) {
			locals.data.main = results;
			next(err);
		});
	});

	view.on('init', function (next) {

		var q = keystone.list('Teacher').model.find({});

		q.exec(function (err, results) {
			locals.data.teachers = results;
			next(err);
		});
	});

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

	view.render('index');
};
