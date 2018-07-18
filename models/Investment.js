var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Investment Model
 * ==========
 */
var Investment = new keystone.List('Investment', {
	nocreate: true
});

Investment.add({
	market: { type: Types.Text, initial: true },
	packages: { type: Types.Text, initial: true },
	amount: { type: Types.Text, initial: true },
	duration: { type: Types.Text, initial: true },
	userId: { type: Types.Relationship, ref: 'User', initial: true }
});

/**
 * Registration
 */
Investment.defaultColumns = 'market, packages, amount, duration';
Investment.register();
