const keystone = require('keystone');
const Investment = keystone.list('Investment').model;
const jwt = require('jsonwebtoken')

module.exports = {
  async index (req, res) {
       try {
        const investments = await Investment.find({userId: req.sourceUser.id}).limit(10);

        if (investments) {
         res.json({investments: investments})
        } else {
          res.status(404).send({
            error: 'You have no investments yet.'
          })
        }
      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error occured trying to get investment.'
        })
      }
  },
  async createInv (req, res) {
    try {
      const user = req.sourceUser
      const investment = new Investment({...req.body, userId: user.id})
      await investment.save();

      res.send({
        investment: investment
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'An error occured trying to make investment'
      })
    }
  }
}
