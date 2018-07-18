/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');
const cors = require('cors');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');

const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const InvestmentController = require('./controllers/InvestmentController')

// Setup Route Bindings
exports = module.exports = function (app) {
	const { authAccess } = AuthenticationController;
	// Views
	app.get('/', (req, res) => {res.redirect('/keystone')});
	app.get('/admin', (req, res) => {res.redirect('/keystone')});

	// API Routes
	app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/api/user',
    jwt({ secret: process.env.JWT_SECRET }),
    AuthenticationController.index)

  app.post('/api/user/investment/create',
    jwt({ secret: process.env.JWT_SECRET }), authAccess, InvestmentController.createInv)

  app.get('/api/user/investment',
   jwt({ secret: process.env.JWT_SECRET }), authAccess, InvestmentController.index)
	 // NOTE 'investments' would be a better name for this route
	// app.get('/api/user/investments',
  //  jwt({ secret: process.env.JWT_SECRET }), authAccess, InvestmentController.index)
};
