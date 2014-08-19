'use strict';

// Configuring the Articles module
angular.module('googlesearches').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Googlesearches', 'googlesearches', 'dropdown', '/googlesearches(/create)?');
		Menus.addSubMenuItem('topbar', 'googlesearches', 'List Googlesearches', 'googlesearches');
		Menus.addSubMenuItem('topbar', 'googlesearches', 'New Googlesearch', 'googlesearches/create');
	}
]);