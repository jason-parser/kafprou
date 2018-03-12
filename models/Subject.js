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

var Subject = new keystone.List('Subject', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: 'Дисциплины',
	plural: 'Дисциплины',
	singular: 'Дисциплина'
});

Subject.add({
	name: { type: String, required: true, label: 'Название' },
	description: { type: String, label: 'Описание' },
	category: { type: Types.Relationship, ref: 'SubjectCategory', label: 'Категория'},
	teachers: { type: Types.Html, wysiwyg: true, label: 'Преподаватели' },
	info: { type: Types.Html, wysiwyg: true, label: 'Дополнительная информация' },
	program: { type: Types.File, storage, label: 'Рабочая программа' }
});

Subject.defaultColumns = 'name, category|20%';
Subject.register();
