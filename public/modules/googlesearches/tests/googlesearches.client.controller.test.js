'use strict';

(function() {
	// Googlesearches Controller Spec
	describe('Googlesearches Controller Tests', function() {
		// Initialize global variables
		var GooglesearchesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Googlesearches controller.
			GooglesearchesController = $controller('GooglesearchesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Googlesearch object fetched from XHR', inject(function(Googlesearches) {
			// Create sample Googlesearch using the Googlesearches service
			var sampleGooglesearch = new Googlesearches({
				name: 'New Googlesearch'
			});

			// Create a sample Googlesearches array that includes the new Googlesearch
			var sampleGooglesearches = [sampleGooglesearch];

			// Set GET response
			$httpBackend.expectGET('googlesearches').respond(sampleGooglesearches);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.googlesearches).toEqualData(sampleGooglesearches);
		}));

		it('$scope.findOne() should create an array with one Googlesearch object fetched from XHR using a googlesearchId URL parameter', inject(function(Googlesearches) {
			// Define a sample Googlesearch object
			var sampleGooglesearch = new Googlesearches({
				name: 'New Googlesearch'
			});

			// Set the URL parameter
			$stateParams.googlesearchId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/googlesearches\/([0-9a-fA-F]{24})$/).respond(sampleGooglesearch);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.googlesearch).toEqualData(sampleGooglesearch);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Googlesearches) {
			// Create a sample Googlesearch object
			var sampleGooglesearchPostData = new Googlesearches({
				name: 'New Googlesearch'
			});

			// Create a sample Googlesearch response
			var sampleGooglesearchResponse = new Googlesearches({
				_id: '525cf20451979dea2c000001',
				name: 'New Googlesearch'
			});

			// Fixture mock form input values
			scope.name = 'New Googlesearch';

			// Set POST response
			$httpBackend.expectPOST('googlesearches', sampleGooglesearchPostData).respond(sampleGooglesearchResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Googlesearch was created
			expect($location.path()).toBe('/googlesearches/' + sampleGooglesearchResponse._id);
		}));

		it('$scope.update() should update a valid Googlesearch', inject(function(Googlesearches) {
			// Define a sample Googlesearch put data
			var sampleGooglesearchPutData = new Googlesearches({
				_id: '525cf20451979dea2c000001',
				name: 'New Googlesearch'
			});

			// Mock Googlesearch in scope
			scope.googlesearch = sampleGooglesearchPutData;

			// Set PUT response
			$httpBackend.expectPUT(/googlesearches\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/googlesearches/' + sampleGooglesearchPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid googlesearchId and remove the Googlesearch from the scope', inject(function(Googlesearches) {
			// Create new Googlesearch object
			var sampleGooglesearch = new Googlesearches({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Googlesearches array and include the Googlesearch
			scope.googlesearches = [sampleGooglesearch];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/googlesearches\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGooglesearch);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.googlesearches.length).toBe(0);
		}));
	});
}());