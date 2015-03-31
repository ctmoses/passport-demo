'use strict';

var app 	= require('../server');
var should	= require('should');
var request	= require('supertest');
var mongoose= require('mongoose');
var User	= require('../app/models/User');

describe('Passport', function() {
	//SIGNUP TESTS==========================================================================
	//======================================================================================
	describe('#Signup', function () {
		//delete the test user after signup tests are complete
		after(function() {
			User.find({username: 'test'}).remove().exec();
		});

		//create a new user==================================
		it('#Should create a new user', function(done) {
			request(app)
				.post('/signup')
				.send({'username': 'test', "password": "test"})
				.expect(302) //login redirects via temp route
				.end(function(err, res) {
					should.not.exist(err); //don't expect any errors
					res.header.location.should.equal('/home'); //check for redirect route
					done(); //return from callback
				});
		});

		//don't create a user if a field is empty==========
		it('#Should not create a new user with empty field', function(done) {
			request(app)
				.post('/signup')
				.send({'username': 'fail'})
				.expect(302) //login redirects via temp route
				.end(function(err, res) {
					should.not.exist(err); //don't expect any errors
					res.header.location.should.equal('/signup'); //check for redirect route
					done(); //return from callback
				});
		});


	});


	//LOGIN TESTS===========================================================================
	//======================================================================================
	describe('#Login-Logout', function () {
		//setup test user before tests run=====================================
		before(function() {
			var user = new User();
			user.username = 'test';
			user.password = user.setHash('test');
			user.save();
		});
	
		//Good login check=====================================================
		it('#Should redirect to /home after login completes', function(done) {
			request(app)
				.post('/login')
				.send({'username':'test', 'password': 'test'})
				.expect(302) //login redirects via temp route
				.end(function(err, res) {
					should.not.exist(err); //don't expect any errors
					res.header.location.should.equal('/home'); //check for redirect route
					done(); //return from callback
				});
		});

		//Login fail check======================================================
		it('#Should redirect to /login again after login failure', function(done) {
			request(app)
				.post('/login')
				.send({'username': 'test', 'password': 'asdfasdfaf'})
				.expect(302) //login redirects via temp route
				.end(function(err, res) {
					should.not.exist(err); //don't expect any errors
					res.header.location.should.equal('/login'); //check for redirect route
					done(); //return from callback
				});
		});

		//logout ================================================================
		it('#Should redirect to /login logout complete', function(done) {
			request(app)
				.get('/logout')
				.expect(302) //login redirects via temp route
				.end(function(err, res) {
					should.not.exist(err); //don't expect any errors
					res.header.location.should.equal('/login'); //check for redirect route
					done(); //return from callback
				});
		});

		//remove test user after tests complete================================
		after(function() {
			User.find({username: 'test'}).remove().exec();
		});
	});

	
	
});
