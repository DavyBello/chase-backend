const {Investment} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  async index (req, res) {
       try {
        const investment = await Investment.findAll({
          limit: 10,
          where: {
          UserId: req.sourceUser.id
          }
        })
        if (investment) {
         res.json({investments: investment})
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
      const investment = await Investment.create({...req.body, UserId: user.id})
      res.send({
        investment: investment.toJSON()
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'An error occured trying to make investment'
      })
    }
  }
}
