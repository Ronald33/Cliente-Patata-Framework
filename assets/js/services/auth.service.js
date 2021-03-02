(function(){
	'use strict';

	angular.module('app').service('Auth', auth);
	auth.$inject = ['CONFIG', '$http', '$localStorage', '$state', 'Dialog'];

	function auth(CONFIG, $http, $localStorage, $state, Dialog)
	{
		var service = {
			existsUserInLocalStorage: existsUserInLocalStorage, 
			setHeaders: setHeaders, 
			getUser: getUser, 
			login: login, 
			logout: logout
		};

		return service;

		function existsUserInLocalStorage()
		{
			if($localStorage._usuario) { return true; }
			else { return false; }
		};

		function setHeaders()
		{
			$http.defaults.headers.common['Authorization'] = $localStorage._usuario.token;
		}

		function getUser() { return $localStorage._usuario; };

		function login(usuario, contrasenha)
		{
			var _headers = {'Authorization': 'usuario-login'};

			$http({
				url: CONFIG.api_url + '/Usuario?usuario=' + usuario + '&contrasenha=' + contrasenha,
				method: 'GET',
				headers: _headers
			}).then(function(response){
				$localStorage._usuario = response.data;
				service.setHeaders();
				$state.go(CONFIG.state_initial.initial);
			}, function(response){
				if(response.status == 404) { Dialog.ealert('Usuario desconocido'); }
			});
		};

		function logout() { delete $localStorage._usuario; $state.go('login'); };
	}
})();

