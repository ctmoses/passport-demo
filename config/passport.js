'use strict';
var LocalStrategy 	= require('passport-local').Strategy;
var User			= require('../app/models/User');

module.exports = function(passport){
	
	// Serialize User
	passport.serializeUser( function(user, done) {
		done(null, user.id);
	});

	// Deserialize User
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	//sign-up strategy 
	passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        process.nextTick(function() {


        // check for existing user
        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.username = username;
                newUser.password = newUser.setHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

	//login strategy
	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
		function(req, username, password, done){
			User.findOne({'username': username}, function(err, user){
				if(err)
					return done(err);
				
				// no user found
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No user found.'));


				//user found, but wrong password
				if(!user.validatePassword(password))
					return done(null, false, req.flash('loginMessage', 'Wrong password.'));


				return(done(null, user));

			});

	})); //end login strategy
};