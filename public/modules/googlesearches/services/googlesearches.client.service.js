'use strict';

//Googlesearches service used to communicate Googlesearches REST endpoints
angular.module('googlesearches').factory('Googlesearches', ['$resource',
	function($resource) {
		return $resource('googlesearches/:googlesearchId', { googlesearchId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);