var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
	nocreate: true
});

User.add({
	name: { type: Types.Text, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	country: { type: Types.Text, initial: true },
	mobile: { type: Types.Text, initial: true }
});

/**
 * Relationships
 */
User.relationship({ ref: 'Investment', path: 'investments', refPath: 'userId' });

/**
 * Registration
 */
User.defaultColumns = 'name, email, mobile, country';
User.register();
