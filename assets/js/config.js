(function(){
	'use strict';
	
	angular.module('app').config(config);
	config.$inject = ['CONFIG', '$urlRouterProvider', '$stateProvider', '$uibModalProvider'];
	
	function config(CONFIG, $urlRouterProvider, $stateProvider, $uibModalProvider)
	{
		$stateProvider
		.state('login', {
			url: '/login',
			title: 'Bienvenido', 
			templateUrl: 'login.html',
			controller: 'LoginController', 
			controllerAs: 'vm'
		})
		.state('admin', {
			templateUrl: 'admin.html',
			abstract: true
		})
		.state('admin.default', {
			url: '/',
			controller: 'DefaultController',
			controllerAs: 'vm',
			authenticate: true
		})
		.state('admin.usuario_listar', {
			url: '/usuarios/lista',
			title: 'Lista de usuarios',
			templateUrl: 'partials/usuario/principal.html',
			controller: 'UsuarioListaController',
			controllerAs: 'vm',
			authenticate: true, 
			resolve: 
			{
				out_usuarios: function(ResUsuario){ return ResUsuario.query(); }, 
			}
		})
		.state('admin.usuario_nuevo', {
			url: '/usuarios/nuevo',
			title: 'Agregar usuario',
			templateUrl: 'partials/usuario/form.html',
			controller: 'UsuarioFormController',
			controllerAs: 'vm',
			authenticate: true, 
			resolve: 
			{
				
			}
		})
		.state('admin.usuario_editar', {
			url: '/usuarios/editar/:id',
			title: 'Editar usuario',
			templateUrl: 'partials/usuario/form.html',
			controller: 'UsuarioFormController',
			controllerAs: 'vm',
			authenticate: true, 
			resolve: 
			{
				
			}
		});

		$urlRouterProvider.otherwise(function($injector){
			var $state = $injector.get('$state');
			$state.go(CONFIG.state_initial.initial);
		});

		/* Modal */
		$uibModalProvider.options.size = 'lg';
		$uibModalProvider.options.backdrop = 'static';
		/* End Modal */
	};
})();
