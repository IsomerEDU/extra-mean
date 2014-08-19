'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Googlesearch = mongoose.model('Googlesearch');

/**
 * Globals
 */
var user, googlesearch;

/**
 * Unit tests
 */
describe('Googlesearch Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			googlesearch = new Googlesearch({
				name: 'Googlesearch Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return googlesearch.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			googlesearch.name = '';

			return googlesearch.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Googlesearch.remove().exec();
		User.remove().exec();

		done();
	});
});