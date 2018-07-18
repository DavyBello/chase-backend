var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Message Model
 * ==========
 */
var Message = new keystone.List('Message');

Message.add({
	title: { type: Types.Text, initial: true },
	body: { type: Types.Text, initial: true },
});

/**
 * Registration
 */
Message.defaultColumns = 'title, body';
Message.register();
