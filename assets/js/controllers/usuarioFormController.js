(function(){
    'use strict';

    angular.module('app').controller('UsuarioFormController', usuarioFormController);

    usuarioFormController.$inject = ['ResUsuario', '$state', '$stateParams', 'Notification'];
    function usuarioFormController(ResUsuario, $state, $stateParams, Notification)
    {
        var vm = this;
        vm.action = 'Agregar';
        vm.usuario = {};
        vm.usuario.tipo = 'VENDEDOR';

        if($stateParams.id)
        {
            vm.action = 'Editar';
            ResUsuario.get({id: $stateParams.id}, function(response){
                vm.usuario = response;
                vm.usuario.cambiarContrasenha = false;
            });
        }

        vm.guardar = guardar;

        function guardar()
        {
            var item = angular.copy(vm.usuario);
            if($stateParams.id) { ResUsuario.update({id: item.id}, item, guardar_success, guardar_error) }
            else { ResUsuario.save(item, guardar_success, guardar_error); }

            function guardar_success(response)
            {
                Notification.success('El usuario fue guardado correctamente');
                $state.go('admin.usuario');
            }

            function guardar_error(response)
            {
                if(response.status = 400) { vm.errors = response.data; }
                Notification.error('El usuario no pudo ser guardado');
            }
        }
    }
})();

