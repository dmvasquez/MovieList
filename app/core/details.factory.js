(function() {
    'use strict';

    angular
        .module('movie-list')
        .factory('DetailsFactory', DetailsFactory);

    DetailsFactory.$inject = ['$http'];
    function DetailsFactory($http) {
        var service = {
            create: create,
            getAll: getAll,
            getById: getById,
            update: update,
            remove: remove
        };
        return service;

        ////////////////

        function create(newDetail) {
        	// $http.post(<url>, <data>, [<options>])
        	return $http.post('http://localhost:49895/api/movies', newDetail);
        }

        function getAll() {
        	return $http.get('http://localhost:49895/api/movies');
        }

        function getById(id) {
        	return $http.get('http://localhost:49895/api/movies' + id);
        }

        function update(id, detail) {
        	return $http.put('http://localhost:49895/api/movies/' +id, detail);
        }

        function remove(id) {
        	return $http.delete('http://localhost:49895/api/movies/' + id);
        }
    }
})();