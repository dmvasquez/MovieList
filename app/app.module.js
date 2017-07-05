(function() {
	'use strict';

	angular
		.module('movie-list', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('dashboard', {
					url: '/dashboard', 
					controller: 'DashboardController as dashboardCtrl',
					templateUrl: '/app/dashboard/dashboard.html'
				})

				// ListView state (My Lists)
                .state('listview', {
					url: '/listview', 
					controller: 'ListViewController as listViewCtrl',
					templateUrl: '/app/listview/listView.html'
				})

				// ListDetailsView state (List Details)
				.state('listdetailsview', {
					url: '/listdetailsview?id', 
					controller: 'ListDetailsViewController as listDetailsCtrl',
					templateUrl: '/app/listdetailsview/listDetailsView.html'
				})				

				// SearchMovies state (Search Results Page)
				.state('searchview', {
					url: '/searchview', 
					controller: 'SearchViewController as searchViewCtrl',
					templateUrl: '/app/searchview/searchView.html'
				})
		});
})();