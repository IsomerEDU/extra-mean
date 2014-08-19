'use strict';

// Googlesearches controller
angular.module('googlesearches').controller('GooglesearchesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Googlesearches',
	function($scope, $stateParams, $location, Authentication, Googlesearches ) {
		$scope.authentication = Authentication;

		// Create new Googlesearch
		$scope.create = function() {
			// Create new Googlesearch object
			var googlesearch = new Googlesearches ({
				name: this.name
			});

			// Redirect after save
			googlesearch.$save(function(response) {
				$location.path('googlesearches/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Googlesearch
		$scope.remove = function( googlesearch ) {
			if ( googlesearch ) { googlesearch.$remove();

				for (var i in $scope.googlesearches ) {
					if ($scope.googlesearches [i] === googlesearch ) {
						$scope.googlesearches.splice(i, 1);
					}
				}
			} else {
				$scope.googlesearch.$remove(function() {
					$location.path('googlesearches');
				});
			}
		};

		// Update existing Googlesearch
		$scope.update = function() {
			var googlesearch = $scope.googlesearch ;

			googlesearch.$update(function() {
				$location.path('googlesearches/' + googlesearch._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Googlesearches
		$scope.find = function() {
			$scope.googlesearches = Googlesearches.query();
		};

		// Find existing Googlesearch
		$scope.findOne = function() {
			$scope.googlesearch = Googlesearches.get({ 
				googlesearchId: $stateParams.googlesearchId
			});
		};
	}
]);