'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Googlesearch = mongoose.model('Googlesearch'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Googlesearch already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Googlesearch
 */
exports.create = function(req, res) {
	var googlesearch = new Googlesearch(req.body);
	googlesearch.user = req.user;

	googlesearch.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(googlesearch);
		}
	});
};

/**
 * Show the current Googlesearch
 */
exports.read = function(req, res) {
	res.jsonp(req.googlesearch);
};

/**
 * Update a Googlesearch
 */
exports.update = function(req, res) {
	var googlesearch = req.googlesearch ;

	googlesearch = _.extend(googlesearch , req.body);

	googlesearch.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(googlesearch);
		}
	});
};

/**
 * Delete an Googlesearch
 */
exports.delete = function(req, res) {
	var googlesearch = req.googlesearch ;

	googlesearch.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(googlesearch);
		}
	});
};

/**
 * List of Googlesearches
 */
exports.list = function(req, res) { Googlesearch.find().sort('-created').populate('user', 'displayName').exec(function(err, googlesearches) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(googlesearches);
		}
	});
};

/**
 * Googlesearch middleware
 */
exports.googlesearchByID = function(req, res, next, id) { Googlesearch.findById(id).populate('user', 'displayName').exec(function(err, googlesearch) {
		if (err) return next(err);
		if (! googlesearch) return next(new Error('Failed to load Googlesearch ' + id));
		req.googlesearch = googlesearch ;
		next();
	});
};

/**
 * Googlesearch authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.googlesearch.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};