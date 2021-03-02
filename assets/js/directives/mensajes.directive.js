(function(){
    'use strict';

    angular.module('app').directive('errorMensajes', errorMensajes);

    errorMensajes.$inject = [];
    function errorMensajes()
    {
        var directive = {
            scope: {
                file: '='
            },
            link: link
        };

        return directive;

        function link(scope, el, attrs)
        {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    }
})();