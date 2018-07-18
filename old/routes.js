const config = require('./config/config')
const jwt = require('express-jwt')
const {User} = require('./models')
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const InvestmentController = require('./controllers/InvestmentController')

async function authAccess (req, res, next) {
  // jwt({ secret: config.authentication.jwtSecret })(req, res, next)
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email
      }
    })
    if (user) {
      req.sourceUser = user.toJSON()
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

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/api/user',
    jwt({ secret: config.authentication.jwtSecret }),
    AuthenticationController.index)

  app.post('/api/user/investment/create',
    jwt({ secret: config.authentication.jwtSecret }), authAccess, InvestmentController.createInv)

  app.get('/api/user/investment',
   jwt({ secret: config.authentication.jwtSecret }), authAccess, InvestmentController.index)
}
