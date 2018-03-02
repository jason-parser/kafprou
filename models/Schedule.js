var keystone = require('keystone');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./uploads'), // required; path where the files should be stored
  	publicPath: '/uploads', // path where files will be served
	},
	schema: {
		size: true,
		mimetype: true,
		path: true,
		originalname: false,
		url: true,
	}
});


var Schedule = new keystone.List('Schedule', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Schedule.add({
	name: { type: String, required: true },
  description: { type: String },
  file: { type: Types.File, storage }
});

Schedule.defaultColumns = 'name';
Schedule.register();
