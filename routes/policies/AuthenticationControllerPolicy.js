const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      country: Joi.string().min(4),
      email: Joi.string().email(),
      mobile: Joi.number().integer().min(4),
      name: Joi.string().min(5).max(30),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const {error, value} = Joi.validate(req.body, schema)

    if(error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Your name must be at least five(5) characters in length.'
          })
          break
        case 'country':
          res.status(400).send({
            error: 'Choose your country.'
          })
          break
        case 'mobile':
          res.status(400).send({
            error: 'Your phone number should be more than four(4) characters long.'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match these rules:
              <br>
              1. It must contain ONLY the following characters: lowercase, uppercase, numerics
              <br>
              2. It must be at least 8 character in length or more
            `
            })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else{
        next()
      }
    }
 }
