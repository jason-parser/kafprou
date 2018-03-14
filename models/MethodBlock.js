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

var MethodBlock = new keystone.List('MethodBlock', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: 'Блоки в метод. работе',
	plural: 'Блоки в метод. работе',
	singular: 'Блок в метод. работе'
});

MethodBlock.add({
	name: { type: String, required: true, label: 'Название блока' },
	description: { type: String, label: 'Описание блока' },
	category: { type: Types.Relationship, ref: 'MethodCategory', label: 'Категория'},
	info: { type: Types.Html, wysiwyg: true, label: 'Текстовая информация' },
	document: { type: Types.File, storage, label: 'Прилагаемый файл' }
});

MethodBlock.defaultColumns = 'name, category|20%';
MethodBlock.register();
