(function(){
    'use strict';
    angular.module('app').controller('PersonaDetallesController', personaDetallesController);

    personaDetallesController.$inject = ['$uibModalInstance', 'out_persona'];
    function personaDetallesController($uibModalInstance, out_persona)
    {
        var vm = this;
        vm.persona = out_persona;

        vm.cerrar = cerrar;
        function cerrar() { $uibModalInstance.dismiss('cancel'); }
    }
})();