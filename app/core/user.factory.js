(function() {
    'use strict';

    angular
        .module('movie-list')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http'];
    function userFactory($http) {
        var service = {
            create: create,
            getAll: getAll,
            getById: getById,
            update: update,
            remove: remove
        };
        return service;

        ////////////////

        function create(newUser) {
        	// $http.post(<url>, <data>, [<options>])
        	return $http.post('http://localhost:49895/api/users', newUser);
        }

        function getAll() {
        	return $http.get('http://localhost:49895/api/users');
        }

        function getById(id) {
        	return $http.get('http://localhost:49895/api/users' + id);
        }

        function update(id, user) {
        	return $http.put('http://localhost:49895/api/users' +id, user);
        }

        function remove(id) {
        	return $http.delete('http://localhost:49895/api/users' + id);
        }
    }
})();