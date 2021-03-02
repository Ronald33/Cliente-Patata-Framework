(function(){
    'use strict';

    angular.module('app').controller('LoginController', loginController);
    
    loginController.$inject = ['Auth'];
    function loginController(Auth)
    {
        var vm = this;
        vm.data = {};
        vm.login = function() { Auth.login(vm.data.usuario, vm.data.contrasenha); };
    };
})();