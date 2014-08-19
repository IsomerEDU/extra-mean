'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Googlesearch Schema
 */
var GooglesearchSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Googlesearch name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Googlesearch', GooglesearchSchema);