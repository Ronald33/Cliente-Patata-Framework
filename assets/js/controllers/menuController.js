(function(){
    'use strict';

    angular.module('app').controller('MenuController', menuController);
    menuController.$inject = ['Auth'];

    function menuController(Auth)
    {
        var vm = this;
        vm.usuario = Auth.getUser();
        vm.logout = function() { Auth.logout(); };
    }
})();