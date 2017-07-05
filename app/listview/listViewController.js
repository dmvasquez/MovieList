(function() {
    'use strict';

    angular
        .module('movie-list')
        .controller('ListViewController', ListViewController);

    ListViewController.$inject = ['ListFactory', '$state'];
    function ListViewController(ListFactory, $state) {
        var vm = this;
        vm.newList = {};
        vm.createList = createList;
        vm.allLists = [];
        vm.listDetail = listDetail;

        activate();

        ////////////////

        function activate() {
            console.log('listview controller working');
            ListFactory
                .getAll()
                .then(function(response) {
                    vm.allLists = response.data;
                    console.log(vm.allLists);
                })
         }

        function createList() {
            console.log('newList firing');
            vm.newList.userId = 1;
            vm.newList.description = 'new!';
            vm.newList.numberOfMovies= 0;
            vm.newList.avarageRating= 0;
            ListFactory
                .create(vm.newList)
                .then(function(response) {
                    console.log('new list created!');
                    activate();
                });
        }
        function displayLists() {
            console.log("display function firing");
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

        function listDetail(id) {
            console.log("list detail function firing");
            $state.go('listdetailsview?'+ id);
        }
    }
})();