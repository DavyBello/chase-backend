const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser({email: userJson.email})
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser({email: userJson.email})
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  async index (req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.user.email
        }
      })
      if (user) {
        res.json(user.toJSON())
      } else {
        res.status(404).send({
          error: 'User not found'
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get user'
      })
    }
  }
}
