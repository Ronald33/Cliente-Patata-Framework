(function(){
    'use strict';

    angular.module('app').controller('DefaultController', defaultController);

    defaultController.$inject = ['Auth', '$state', 'CONFIG'];
    function defaultController(Auth, $state, CONFIG)
    {
        var vm = this;
        vm.usuario = Auth.getUser();
        // Seleccionamos la pantalla inicial segun el tipo de usuario
        if(vm.usuario.tipo == 'ADMINISTRADOR') { $state.go(CONFIG.state_initial.administrador); }
        else if(vm.usuario.tipo == 'VENDEDOR') { $state.go(CONFIG.state_initial.operador); }
    };
})();