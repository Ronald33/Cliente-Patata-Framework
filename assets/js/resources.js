(function(){
    'use strict';

    angular.module('app').factory('ResUsuario', ['CONFIG', '$resource', function(CONFIG, $resource){
        return $resource(CONFIG.api_url + '/Usuario/:id', {id: '@id'}, {update: {method: 'PUT'}, patch: {method: 'PATCH'}});
    }]);

    angular.module('app').factory('ResPersona', ['CONFIG', '$resource', function(CONFIG, $resource){
        return $resource(CONFIG.api_url + '/Persona/:id', {id: '@id'}, {update: {method: 'PUT'}});
    }]);
    
    angular.module('app').factory('ResExtras', ['CONFIG', '$resource', function(CONFIG, $resource){
        var queryArray = {
            method: 'POST', 
            isArray: true, 
            hasBody: true
        };
        var queryObject = {
            method: 'POST', 
            hasBody: true
        };
        return $resource(CONFIG.api_url + '/Extras/:id', {id: '@id'}, {queryArray: queryArray, queryObject: queryObject});
    }]);
})();