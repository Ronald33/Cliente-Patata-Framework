(function(){
    'use strict';

    angular.module('app').controller('PersonaFormController', personaFormController);

    personaFormController.$inject = ['$uibModalInstance', 'ResPersona', 'Notification', 'out_persona', 'out_documento'];
    function personaFormController($uibModalInstance, ResPersona, Notification, out_persona, out_documento)
    {
        var vm = this;
        vm.persona = {};

        if(out_persona) { vm.persona = out_persona; }
        else { vm.persona.dni = out_documento; vm.persona.pasaporte = out_documento; }

        vm.cerrar = cerrar;
        vm.guardar = guardar;

        function cerrar() { $uibModalInstance.dismiss('cancel'); }
        function guardar()
        {
            var item = angular.copy(vm.persona);
            if(out_persona) { ResPersona.update({id: item.id}, item, guardar_success, guardar_error) }
            else { ResPersona.save(item, guardar_success, guardar_error); }

            function guardar_success(response)
            {
                Notification.success('La persona fue guardada correctamente');
                $uibModalInstance.close(response);
            }

            function guardar_error(response)
            {
                if(response.status = 400) { vm.errors = response.data; }
                Notification.error('La persona no pudo ser guardada');
            }
        }
    }
})();

