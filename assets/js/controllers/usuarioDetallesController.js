(function(){
    'use strict';
    angular.module('app').controller('UsuarioDetallesController', usuarioDetallesController);

    usuarioDetallesController.$inject = ['$uibModalInstance', 'out_usuario'];
    function usuarioDetallesController($uibModalInstance, out_usuario)
    {
        var vm = this;
        out_usuario.$promise.then(function(response){
            vm.usuario = response;
            vm.persona = vm.usuario.persona;
        });

        vm.cerrar = cerrar;
        
        function cerrar() { $uibModalInstance.dismiss('cancel'); }
    }
})();