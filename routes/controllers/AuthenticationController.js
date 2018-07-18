const keystone = require('keystone');
const User = keystone.list('User').model;
const jwt = require('jsonwebtoken')
// const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = new User(req.body)
      await user.save();

      user.password = '';
      res.send({
        user: user,
        token: jwtSignUser({id: user.id})
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({email});
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      // validate password
      return user._.password.compare(password, (err, isMatch) => {
        if (err) {
          return res.status(403).send({
            error: err
          })
        }

        if (!isMatch) {
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        }

        user.password = '';
        // create jwt
        res.send({
          user,
          token: jwtSignUser({id: user.id})
        })
      });

    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  async index (req, res) {
    try {
      const user = await User.findById(req.user.id)
      if (user) {
        user.password = '';
        res.json(user)
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
  },
  async authAccess (req, res, next) {
    // jwt({ secret: config.authentication.jwtSecret })(req, res, next)
    try {
      const user = await User.findById(req.user.id)
      if (user) {
        req.sourceUser = user;
        next()
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
