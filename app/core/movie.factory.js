(function() {
    'use strict';

    angular
        .module('movie-list')
        .factory('MovieFactory', MovieFactory);

    MovieFactory.$inject = ['$http'];
    /* @ngInject */
    function MovieFactory($http) {
        
        var vm = this;

        vm.service = service;

        ///////////////////////////////////////////
        var service = {
        searchForMovie: function searchForMovie(movieinput) {
            return $http.get('http://www.omdbapi.com/?s=' + movieinput + '&apikey=8008511c')
            },
        getById: function(movieinput){
            return $http.get('http://www.omdbapi.com/?i=' + imdbId);
            }
        };
    
        return service;
    }
})();