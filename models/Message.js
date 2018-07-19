var keystone = require('keystone');
var Types = keystone.Field.Types;

const RECEIVERS_TYPE = [
	'ALL_USERS',
	'CUSTOM'
]
/**
 * Message Model
 * ==========
 */
const Message = new keystone.List('Message', {
	track: true
});
Message.schema.set('usePushEach', true);

Message.add({
	title: { type: Types.Text, initial: true, required: true, index: true },
	body: { type: Types.Textarea, initial: true, required: true, index: true },
	receiversType: { type: Types.Select, options: RECEIVERS_TYPE, default: 'ALL_USERS', index: true, initial: true },
	receivers: { type: Types.Relationship, ref: 'User', many: true, dependsOn: { receiversType: 'CUSTOM' }, index: true, initial: true },
});

/**
 * Relationships
 */
Message.relationship({ ref: 'MessageReadReceipt', path: 'readReceipts', refPath: 'message' });

/**
 * Registration
 */
Message.defaultSort = '-createdAt';
Message.defaultColumns = 'title, body, receiversType, receivers, createdAt';
Message.register();
