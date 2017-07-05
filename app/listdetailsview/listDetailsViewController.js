(function() {
    'use strict';

    angular
        .module('movie-list')
        .controller('ListDetailsViewController', ListDetailsViewController);

    ListDetailsViewController.$inject = ['$stateParams', 'ListFactory', 'DetailsFactory', '$state'];
    function ListDetailsViewController($stateParams, ListFactory, DetailsFactory, $state) {
        var vm = this;
        vm.detailedList = {};
        vm.order = '';
        vm.sortOrder = sortOrder;
        vm.movieId= 0;
        vm.deleteMovie = deleteMovie;
        vm.listId = $stateParams.id;
        vm.updateRating = updateRating;
        vm.detail = {};
        vm.newRating = 3;
        vm.averageRating = 0;
        vm.sum = 0;
        vm.avgRatingObject = {};
        vm.generalList = {}

        activate();

        ////////////////

        function activate() {
            console.log('list DETAILS controller working');
            ListFactory
                .getById(vm.listId)
                .then(function(response){
                    vm.detailedList = response.data;
                    console.log(vm.detailedList.placements);
                    for(var i=0; i<vm.detailedList.placements.length; i++) {
                        vm.sum += vm.detailedList.placements[i].movies.rating;
                    }
                    vm.averageRating = vm.sum / vm.detailedList.placements.length;    
                    console.log(vm.listId);
                    ListFactory
                        .getAll()
                        .then(function(response){
                            vm.generalList = response.data;
                            for(var i=0; i<vm.generalList.length; i++) {
                                if (vm.generalList[i].listId == vm.listId) {
                                    console.log(vm.generalList[i]);
                                    vm.avgRatingObject.listId = vm.generalList[i].listId;
                                    vm.avgRatingObject.numberOfMovies = vm.generalList[i].numberOfMovies;
                                    vm.avgRatingObject.placements = vm.generalList[i].placements;
                                    vm.avgRatingObject.title = vm.generalList[i].title;
                                    vm.avgRatingObject.userId = vm.generalList[i].userId;
                                    console.log(vm.generalList[i]);
                                    console.log(vm.avgRatingObject);
                                    vm.avgRatingObject.averageRating = vm.averageRating
                                    console.log('old: ' + vm.generalList[i].averageRating);
                                    console.log('new: ' + vm.avgRatingObject.averageRating);
                                }
                            }
                        });               
                        console.log(vm.listId, vm.avgRatingObject);
                    ListFactory
                        .update(vm.listId, vm.avgRatingObject)
                        .then(function(response) {
                            console.log('updated avg Rating!');
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    vm.sum =0;
                })
                .catch(function(error){
                    console.log(error)
                });
         }

        function sortOrder(x) {
             vm.order = x;
             console.log(vm.order);
         }

        function deleteMovie(id) {
            if (confirm('Are you sure you want to remove movie from list?')) {
                DetailsFactory
                    .remove(id.movieId)
                    .then(function(response) {
                        $state.go('listview');
                    })
                    .catch(function(error) {
                        console.log('deletion not succesful');
                    });
            }
        }

        function updateRating(id) {
            vm.detail = id;
            vm.detail.rating = vm.newRating;
            DetailsFactory
                .update(id.movieId, vm.detail)
                .then(function(response) {
                    console.log(vm.newRating);
                    activate();
                })
                .catch(function(error) {
                    console.log('update error');
                });
        }
    }
})();