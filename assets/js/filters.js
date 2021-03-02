(function(){
    'use strict';

    angular.module('app').filter('myDate', myDate);
    angular.module('app').filter('myTime', myTime);
    angular.module('app').filter('myDateTime', myDateTime);
    angular.module('app').filter('dni', dni);
    angular.module('app').filter('persona', persona);

    myDate.$inject = ['$filter']
    function myDate($filter)
    {
        return function(input)
        {
            return $filter('date')(input, "dd/MM/yyyy" , '-0500');
        };
    }

    myTime.$inject = ['$filter']
    function myTime($filter)
    {
        return function(input)
        {
            return $filter('date')(input, "h:mm a" , '-0500');
        };
    }

    myDateTime.$inject = ['$filter']
    function myDateTime($filter)
    {
        return function(input)
        {
            return $filter('date')(input, "dd/MM/yyyy - h:mm a" , '-0500');
        };
    }

    dni.$inject = []
    function dni()
    {
        return function(input)
        {
            return String(input).padStart(8, "0");
        };
    }

    persona.$inject = []
    function persona()
    {
        return function(input)
        {
            if (!input) { return input; }
            var result = input.nombres + ' ' + input.apellidos;
            if(input.documento) { result += ' (' + input.documento + ')'; }
            return result;
        };
    }
})();