(function(){
    'use strict';

    angular.module('app').directive('file', file);

    file.$inject = [];
    function file()
    {
        var directive = {
            scope: {
                file: '='
            },
            link: link
        };

        return directive;

        function link (scope, el, attrs)
        {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                if(file.size > 2097152) { alert('El archivo supera el tamaño permitido'); event.target.value = null; }
                else { scope.file = file ? file : undefined; scope.$apply(); }
            });
        }
    }
})();