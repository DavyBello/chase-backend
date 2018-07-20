const keystone = require('keystone');
const Message = keystone.list('Message').model;
const MessageReadReceipt = keystone.list('MessageReadReceipt').model;

module.exports = {
  async findMany (req, res) {
       try {
        // const messages = await Message.find({userId: req.sourceUser.id}).limit(10);
        const messages = await Message.find({$or: [
          { receiversType: 'ALL_USERS' },
          { $and: [ {receiversType: 'CUSTOM'}, {receivers: {$in: [req.sourceUser.id]}} ] }
        ]}).limit(10)

        const readReceipts = await MessageReadReceipt.find({
          user: req.sourceUser.id
        })

        if (messages) {
          res.json({
            messages: messages.map(message=>{
              // message.isRead = readReceipts.find(receipt => (receipt.message == message.id)) ? true : false;
              msg = Object.assign({}, message)
              msg._doc.isRead = readReceipts.find(receipt => (receipt.message == message.id)) ? true : false;
              return (msg._doc);
            })}
          )
        } else {
          res.status(404).send({
            error: 'You have no messages yet.'
          })
        }
      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error occured trying to get messages.'
        })
      }
  },
  async createReadReciepts (req, res) {
    try {
      const user = req.sourceUser
      const { messageIds = []} = req.body
      // console.log(req.body);

      if (Array.isArray(messageIds)){
        await Promise.all(messageIds.map(async (messageId)=>{
          const messageExists = await Message.findOne({$and: [
            { _id: messageId },
            { $or: [
              { receiversType: 'ALL_USERS' },
              { $and: [ {receiversType: 'CUSTOM'}, {receivers: {$in: [req.sourceUser.id]}} ] }
            ]}
          ]})
          //only create readReceipts for existing messages
          if (messageExists) {
            const exist = await MessageReadReceipt.findOne({message: messageId, user: user.id})
            //avoid duplicating read readReceipts
            if (!exist) {
              const readReceipt = new MessageReadReceipt({message: messageId, user: user.id})
              await readReceipt.save();
            }
          }
        }))
        res.send({
          status: 'success'
        })
      } else {
        res.status(400).send({
          error: 'invalid request body'
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(400).send({
        error: 'An error occured trying to create read receipts'
      })
    }
  }
}
