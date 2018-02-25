var keystone = require('keystone');
var Types = keystone.Field.Types;

var Teacher = new keystone.List('Teacher', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Teacher.add({
	name: { type: String, required: true },
	position: { type: String },
	image: { type: Types.CloudinaryImage }
});

Teacher.defaultColumns = 'name, position|20%';
Teacher.register();
