'use strict';
var mongoose 	= require('mongoose');
var bcrypt		= require('bcrypt-nodejs');

//setup schema
var userSchema = mongoose.Schema({
	username: String,
	password: String
});

// create the hashed password
userSchema.methods.setHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//ensure hashed password matches saved hash
userSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
