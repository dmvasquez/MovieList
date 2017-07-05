(function() {
    'use strict';

    angular
        .module('movie-list')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['userFactory'];
    function DashboardController(userFactory) {
        var vm = this;
        vm.name = 'Name goes here';
        vm.numberOfLists = 0;
        vm.userId = 1;

        vm.login = login;

        activate();

        ////////////////

        function activate() {
            console.log('dashboard controller working');
         }

        function login() {
            console.log('login function working');
            userFactory
                .getAll()
                .then(function(response){
                    vm.results = response.data;
                    console.log(vm.results);
                    for(var i=0; i<= vm.results.length - 1 ; i++) {
                        if(vm.results[i].emailAddress == vm.inputEmail) {
                            if(vm.results[i].password == vm.inputPassword){
                                console.log(vm.results[i]);
                                vm.userId = vm.results[i].userId;
                                vm.name = vm.results[i].name;
                                vm.numberOfLists = vm.results[i].count;
                                $('#loginbox').hide();
                                $('#dash').show();
                                vm.userId = vm.results[i].userId;
                                return vm.results[i];
                            }
                        }
                        else {
                            console.log('You shall not pass');
                            return vm.results = null;
                        }
                    }
                })
        }
    }
})();