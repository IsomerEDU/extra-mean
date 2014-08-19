'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var googlesearches = require('../../app/controllers/googlesearches');

	// Googlesearches Routes
	app.route('/googlesearches')
		.get(googlesearches.list)
		.post(users.requiresLogin, googlesearches.create);

	app.route('/googlesearches/:googlesearchId')
		.get(googlesearches.read)
		.put(users.requiresLogin, googlesearches.hasAuthorization, googlesearches.update)
		.delete(users.requiresLogin, googlesearches.hasAuthorization, googlesearches.delete);

	// Finish by binding the Googlesearch middleware
	app.param('googlesearchId', googlesearches.googlesearchByID);
};