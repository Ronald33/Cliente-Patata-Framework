(function(){
    'use strict';
    angular.module('app').controller('UsuarioListaController', usuarioListaController);

    usuarioListaController.$inject = ['ResUsuario', 'Dialog', 'Notification', '$uibModal', 'out_usuarios'];
    function usuarioListaController(ResUsuario, Dialog, Notification, $uibModal, out_usuarios)
    {
        var vm = this;
        vm.itemsByPage = 1;
        // vm.usuarios = out_usuarios;

        out_usuarios.$promise.then(function(response){
            vm.usuarios = response;
            vm.displayCollection = [].concat(vm.usuarios);
        });

        vm.ver = ver;
        vm.deshabilitar = deshabilitar;
        vm.habilitar = habilitar;
        vm.eliminar = eliminar;

        function ver(usuario)
        {
            var modalInstance = $uibModal.open({
                templateUrl: 'partials/usuario/form-modal-detalles.html', 
                controller: 'UsuarioDetallesController', 
                controllerAs: 'vm', 
                bindToController: true, 
                resolve: 
                {
                    out_usuario: function(ResUsuario) { return ResUsuario.get({id: usuario.id}); }
                }
            });
            
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function deshabilitar(usuario)
        {
            Dialog.wconfirm('Se deshabilitará al usuario: <b>' + usuario.usuario + '</b>, ¿Desea continuar?' , function(){
                ResUsuario.patch({id: usuario.id}, {habilitado: 0}, function(response){
                    usuario.habilitado = 0;
                    Notification.success('El usuario ' + usuario.persona.nombres + ' fue deshabilitado correctamente');
                });
            });
        }

        function habilitar(usuario)
        {
            Dialog.wconfirm('Se habilitará al usuario: <b>' + usuario.usuario + '</b>, ¿Desea continuar?' , function(){
                ResUsuario.patch({id: usuario.id}, {habilitado: 1}, function(response){
                    usuario.habilitado = 1;
                    Notification.success('El usuario ' + usuario.persona.nombres + ' fue habilitado correctamente');
                });
            });
        }

        function eliminar(usuario)
        {
            Dialog.wconfirm('Se eliminará al usuario: <b>' + usuario.usuario + '</b>, ¿Desea continuar?' , function(){
                ResUsuario.delete({id: usuario.id}, function(){
                    vm.usuarios.splice(vm.usuarios.indexOf(usuario), 1);
                    Notification.success('La usuario fue eliminada correctamente');
                });
            });
        }
    }
})();