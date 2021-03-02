(function(){
	'use strict';
	
	angular.module('app').run(run);
	run.$inject = ['CONFIG', '$rootScope', '$window', '$http', '$state', '$stateParams', 'Auth', 'bootstrap3ElementModifier', 'defaultErrorMessageResolver'];
	
	function run(CONFIG, $rootScope, $window, $http, $state, $stateParams, Auth, bootstrap3ElementModifier, defaultErrorMessageResolver)
	{
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		if(Auth.existsUserInLocalStorage()) { Auth.setHeaders(); }

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams){

			if(toState.name == 'login' && Auth.existsUserInLocalStorage())
			{
				event.preventDefault();
				$state.go(CONFIG.state_initial.initial);
			}
			if(toState.authenticate && !Auth.existsUserInLocalStorage())
			{
				event.preventDefault();
				$state.go('login');
			}
		});

		bootstrap3ElementModifier.enableValidationStateIcons(true);
		defaultErrorMessageResolver.setI18nFileRootPath('assets/bower_components/angular-auto-validate/dist/lang');
		defaultErrorMessageResolver.setCulture('es-co');

		defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
			errorMessages['isWords'] = 'Solo esta permitido letras y espacios';
			errorMessages['isDni'] = 'Ingrese un DNI';
			errorMessages['isRuc'] = 'Ingrese un RUC';
			errorMessages['min'] = 'Debe ingresar un valor mayor a {0}';
			errorMessages['max'] = 'Debe ingresar un valor menor a {0}';
			errorMessages['isEqualTo'] = 'No cumple las condiciones necesarias';
			//errorMessages['anotherErrorMessage'] = 'An error message with the attribute value {0}';
		});

		$rootScope.isLoading = function() { return $http.pendingRequests.length > 0; };
		$rootScope.goBack = function() { $window.history.back(); }
	};
})();
