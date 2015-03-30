'use strict';
module.exports = function(app, passport){
	 // =====================================
    // HOME PAGE 
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // =====================================
    // LOGIN 
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate( 'local-login', {
    	successRedirect: '/test',
    	failureRedirect: '/login',
    	flashFailure: true
    }));

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP 
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
    	res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    //handle new user signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/test', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // LOGOUT 
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });
 
    // =====================================
    // OTHER STUFF
    // =====================================
    // check auth before passing to other pages
    app.get('/*', checkAuth, function(req, res) {
        res.send('other pages...');
    });

    
};

// route middleware to make sure a user is logged in
function checkAuth(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

