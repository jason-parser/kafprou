var keystone = require('keystone');
var Types = keystone.Field.Types;

var MainPage = new keystone.List('MainPage', {
	map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
	label: 'Главная страница'
});

MainPage.add({
	title: { type: String, required: true, label: 'Заголовок' },
  content: { type: Types.Html, wysiwyg: true, label: 'Описание' },
  image: { type: Types.CloudinaryImage, label: 'Изображение' }
});

MainPage.defaultColumns = 'title';
MainPage.register();
