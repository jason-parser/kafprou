var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	category: { type: Types.Select, options: 'Бакалавриат, Магистратура, Аспирантура, Доп. образование' , label: 'Категория'}
});

Subject.defaultColumns = 'name, category|20%';
Subject.register();
