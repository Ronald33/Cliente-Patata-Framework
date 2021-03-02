(function(){
    'use strict';

    angular.module('app').directive('ipersona', ipersona);

    ipersona.$inject = [];
    function ipersona()
    {
        var directive = {
            restrict: 'E', 
            templateUrl: 'partials/directives/ipersona/ipersona.html', 
            scope: {
                persona: '='
            }, 
            controller: ipersonaController, 
            controllerAs: 'vm', 
            bindToController: true
        };

        return directive;
    }

    ipersonaController.$inject = ['ResPersona', '$uibModal', 'Dialog', 'Notification'];
    function ipersonaController(ResPersona, $uibModal, Dialog, Notification)
    {
        var vm = this;
        vm.data = {};

        vm.buscarPorDocumento = buscarPorDocumento;
        vm.detalles = detalles;
        vm.eliminar = eliminar;
        vm.abrir_form = abrir_form;

        vm.personaRefresh = personaRefresh;

        function personaRefresh(filter)
        {
            if(filter.length > 1) { vm.personas = ResPersona.query({filter: filter}); }
            else { vm.personas = []; }
        }

        function buscarPorDocumento()
        {
            ResPersona.get({documento: vm.documento}, function(response){
                vm.persona = response;
                Notification.success('Se encontro una coincidencia');
            }, function(){
                vm.persona = null;
                Dialog.walert('No se encontró a una persona con el documento: ' + vm.documento);
            });
        }

        function detalles(persona)
        {
            var modalInstance = $uibModal.open({
                templateUrl: 'partials/persona/form-modal-detalles.html', 
                controller: 'PersonaDetallesController', 
                controllerAs: 'vm', 
                bindToController: true, 
                resolve: {
                    out_persona: function(ResPersona) { return ResPersona.get({id: persona.id}); }
                }
            });

            modalInstance.result.then(angular.noop, angular.noop);
        }

        function eliminar()
        {
            vm.persona = null;
            vm.documento = '';
        }

        function abrir_form(editar)
        {
            var modalInstance = $uibModal.open({
                templateUrl: 'partials/persona/form-modal.html', 
                controller: 'PersonaFormController', 
                controllerAs: 'vm', 
                bindToController: true, 
                resolve: {
                    out_persona: function(ResPersona) { return editar ? ResPersona.get({id: vm.persona.id}) : null; }, 
                    out_documento: function() { return editar ? null : angular.copy(vm.documento); }
                }
            });

            modalInstance.result.then(function(persona){
                vm.persona = persona;
            }, angular.noop);
        }
    }
})();