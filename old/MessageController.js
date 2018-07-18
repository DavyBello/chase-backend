const {Message} = require('../models')

module.exports = {
  async index (req, res) {
    const user = await User.findAll(req.user.email)
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).send({
        error: 'User not found'
      })
    }
  }
}
