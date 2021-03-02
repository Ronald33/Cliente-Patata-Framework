(function(){
    'use strict';

    angular.module('app').service('Helper', helper);

    helper.$inject = [];
    function helper()
    {
        var service = {
            fillObjectFromString: fillObjectFromString
        };

        return service;

        function fillObjectFromString(obj, path)
        {
            var result = obj;
            var parts = path.split('.'), length = parts.length;
            for(var i = 0; i < length; i++)
            {
                var item = parts[i];
                if(!result.hasOwnProperty(item)) { result[item] = {}; }
                result = result[item];
            }
        }
    }
})();