var keystone = require('keystone');
var Types = keystone.Field.Types;

var Subject = new keystone.List('Subject', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Subject.add({
	name: { type: String, required: true },
	description: { type: String },
});

Subject.defaultColumns = 'name, position|20%';
Subject.register();
