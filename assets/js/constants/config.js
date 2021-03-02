(function(){
    'use strict';

    angular.module('app').constant('CONFIG', {
        api_url: 'http://localhost/Patata-Framework',
        convert_now_allowed_to_post: false, 
        state_initial: {
            'initial': 'admin.default', 
            'administrador': 'admin.usuario_listar', 
            'vendedor': 'admin.usuario_nuevo'
        }
    });    
})();
