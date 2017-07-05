(function() {
    'use strict';

    angular
        .module('movie-list')
        .controller('SearchViewController', SearchViewController);

    SearchViewController.$inject = ['MovieFactory', 'ListFactory'];
    function SearchViewController(MovieFactory, ListFactory) {
        var vm = this;
        vm.newList ={};

        vm.findMovies = findMovies;
        vm.createFromMovie = createFromMovie;

        ////////////////

        function findMovies(movieinput) {
            console.log("findMovies function firing");
            MovieFactory
                .searchForMovie(movieinput)
                .then(function(response) {
                    vm.results =response.data.Search;
                    console.log(vm.results);
                })
                .catch(function(error) {
                    console.log('error');
                });
        }

        function createFromMovie() {
            console.log("new list from movie function firing");
            vm.newList.userId = 1;
            vm.newList.description = 'new!';
            vm.newList.numberOfMovies= 1;
            vm.newList.avarageRating= 3;
            ListFactory
                .create(vm.newList)
                .then(function(response) {
                    console.log('new list created!');
                });
        }
    }
})();