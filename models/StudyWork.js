var keystone = require('keystone');
var Types = keystone.Field.Types;

var StudyWork = new keystone.List('Учебная работа', {
	map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  plural: 'Учебная работа'
});

StudyWork.add({
	title: { type: String, required: true },
	content: { type: Types.Html, wysiwyg: true },
});

StudyWork.defaultColumns = 'title, position|20%';
StudyWork.register();
