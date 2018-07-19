var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MessageReadReceipt Model
 * ==========
 */
const MessageReadReceipt = new keystone.List('MessageReadReceipt', {
	noedit: true
});
MessageReadReceipt.schema.set('usePushEach', true);

MessageReadReceipt.add({
	message: { type: Types.Relationship, ref: 'Message', many: false, index: true, required: true, initial: true },
	user: { type: Types.Relationship, ref: 'User', many: false, index: true, required: true, initial: true },
	createdAt: { type: Types.Date, index: true, default: Date.now }
});

/**
 * Registration
 */
MessageReadReceipt.defaultColumns = 'message, user, createdAt';
MessageReadReceipt.register();
