'use strict';

//Setting up route
angular.module('googlesearches').config(['$stateProvider',
	function($stateProvider) {
		// Googlesearches state routing
		$stateProvider.
		state('listGooglesearches', {
			url: '/googlesearches',
			templateUrl: 'modules/googlesearches/views/list-googlesearches.client.view.html'
		}).
		state('createGooglesearch', {
			url: '/googlesearches/create',
			templateUrl: 'modules/googlesearches/views/create-googlesearch.client.view.html'
		}).
		state('viewGooglesearch', {
			url: '/googlesearches/:googlesearchId',
			templateUrl: 'modules/googlesearches/views/view-googlesearch.client.view.html'
		}).
		state('editGooglesearch', {
			url: '/googlesearches/:googlesearchId/edit',
			templateUrl: 'modules/googlesearches/views/edit-googlesearch.client.view.html'
		});
	}
]);