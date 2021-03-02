(function(){
    'use strict';
    
    angular.module('app').directive('isWords', isWords);
    angular.module('app').directive('isDni', isDni);
    angular.module('app').directive('isRuc', isRuc);
    angular.module('app').directive('isEqualTo', isEqualTo);

    isWords.$inject = [];
    function isWords()
    {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, control) {
                control.$validators.isWords = function (modelValue, viewValue) {
                    if(control.$isEmpty(modelValue)) { return false; }
                    else { return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(viewValue); }
                };
            }
        };
    }

    isDni.$inject = [];
    function isDni()
    {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, control) {
                control.$validators.isDni = function (modelValue, viewValue) {
                    if(control.$isEmpty(modelValue)) { return false; }
                    else { return /^[0-9]{8}$/.test(viewValue); }
                };
            }
        };
    }

    isRuc.$inject = [];
    function isRuc()
    {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, control) {
                control.$validators.isRuc = function (modelValue, viewValue) {
                    if(control.$isEmpty(modelValue)) { return false; }
                    else { return /^[0-9]{11}$/.test(viewValue); }
                };
            }
        };
    }

    isEqualTo.$inject = [];
    function isEqualTo()
    {
        return {
            restrict: 'A', 
            require: 'ngModel', 
            scope: {
                isEqualTo: '='
            }, 
            link: function(scope, element, attributes, control)
            {
                var valueCache = null;

                scope.$watch('isEqualTo', function(newValue, oldValue){
                    valueCache = newValue;
                    validate(control.$viewValue);
                });
                
                var validate = function (value) {
                    control.$setValidity("isEqualTo", value === valueCache);
                    return value === valueCache ? value : undefined;
                };
                
                control.$parsers.unshift(validate);
            }
        };
    }
})();

