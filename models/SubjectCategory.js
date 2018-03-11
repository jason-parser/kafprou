var keystone = require('keystone');
var Types = keystone.Field.Types;

var SubjectCategory = new keystone.List('SubjectCategory', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: 'Категории дисциплин',
	plural: 'Категория дисциплин',
	singular: 'Категории дисциплин'
});

SubjectCategory.add({
	name: { type: String, required: true, label: 'Название' }
});

SubjectCategory.defaultColumns = 'name';
SubjectCategory.register();
