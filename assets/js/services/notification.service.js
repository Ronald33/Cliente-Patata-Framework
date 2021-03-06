(function(){
    'use strict';

    angular.module('app').service('Notification', notification);

    notification.$inject = [];
    function notification()
    {
        iziToast.settings({
            //timeout: 10000,
            //resetOnHover: true,
            //icon: 'material-icons',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX'
        });

        var service = {
            success: success, 
            error: error
        };

        return service;

        function success(message)
        {
            //alertify.success(message);
            iziToast.success({
                title: '¡Operación exitosa!',
                message: message
            });
        }
        function error(message)
        {
            //alertify.error(message);
            iziToast.error({
                title: '¡Error!',
                message: message
            });
        }
    }
})();