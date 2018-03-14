var keystone = require('keystone');
var Types = keystone.Field.Types;

var Science = new keystone.List('Science', {
	map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
	label: 'Блоки в научной работе'
});

Science.add({
	title: { type: String, required: true, label: 'Заголовок' },
  content: { type: Types.Html, wysiwyg: true, label: 'Содержимое' }
});

Science.defaultColumns = 'title';
Science.register();
