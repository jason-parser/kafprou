var keystone = require('keystone');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: 'AKIAJJXSNNKQIAN6RA5A',
    secret: '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',
    bucket: 'kafprou',
    region: 'eu-west-1',
    path: '/schedules'
  },
});


var Schedule = new keystone.List('Schedule', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Schedule.add({
	name: { type: String, required: true },
  description: { type: String },
  file: { type: Types.File, storage: storage }
});

Schedule.defaultColumns = 'name';
Schedule.register();
