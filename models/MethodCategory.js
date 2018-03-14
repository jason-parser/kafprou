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

var MethodCategory = new keystone.List('MethodCategory', {
	map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
	label: 'Методическая работа'
});

MethodCategory.add({
	title: { type: String, required: true },
	content: { type: Types.Html, wysiwyg: true, label: 'Описание' },
});

MethodCategory.defaultColumns = 'title';
MethodCategory.register();
