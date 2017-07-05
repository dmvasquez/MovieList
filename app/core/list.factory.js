(function() {
    'use strict';

    angular
        .module('movie-list')
        .factory('ListFactory', ListFactory);

    ListFactory.$inject = ['$http'];
    function ListFactory($http) {
        var service = {
            create: create,
            getAll: getAll,
            getById: getById,
            update: update,
            remove: remove
        };
        return service;

        ////////////////

        function create(newList) {
        	// $http.post(<url>, <data>, [<options>])
        	return $http.post('http://localhost:49895/api/lists', newList);
        }

        function getAll() {
        	return $http.get('http://localhost:49895/api/lists');
        }

        function getById(id) {
        	return $http.get('http://localhost:49895/api/lists/' + id);
        }

        function update(id, list) {
        	return $http.put('http://localhost:49895/api/lists/' +id, list);
        }

        function remove(id) {
        	return $http.delete('http://localhost:49895/api/lists' + id);
        }
    }
})();