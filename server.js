'use strict';

// Dependencies+
var express		= require('express');
var app			= express();
var port     	= process.env.PORT || 8080;
var mongoose 	= require('mongoose');
var passport 	= require('passport');
var flash    	= require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var sessions 	 = require('express-session');
var flash 		 = require('connect-flash');
var cors       	 = require("cors");
var path         = require('path');

//config setup
// Express configuration
	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.json()); // get information from html forms
	app.use(bodyParser.urlencoded({ extended: true }));
	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	require('./config/passport')(passport); //bring in local strategies
	app.use(sessions({ secret: 'mosesPassportDemo' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	//get files for angular
  	app.use("/angular", express.static(__dirname + '/angular'));

//DB connect
var configDB	= require('./config/database.js');	//connect to db
mongoose.connect(configDB.url);

//connect routes
require('./app/routes')(app, passport) //fire up auth strategy



app.listen(port);
console.log("Listening on port " + port + "...")