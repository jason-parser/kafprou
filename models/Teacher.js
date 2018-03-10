var keystone = require('keystone');
var Types = keystone.Field.Types;

var Teacher = new keystone.List('Teacher', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: 'Преподаватели',
	plural: 'Преподаватели',
	singular: 'Преподаватель'
});

Teacher.add({
	name: { type: String, required: true, label: 'ФИО' },
	position: { type: String, label: 'Должность' },
	degree: { type: String, label: 'Степень' },
	info: { type: Types.Html, wysiwyg: true, label: 'Доп. информация' },
	image: { type: Types.CloudinaryImage, label: 'Фотография' }
});

Teacher.defaultColumns = 'name, position|20%';
Teacher.register();
