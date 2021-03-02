(function(){
	'use strict';

	angular.module('app').factory('PatataInterceptor', patataInterceptor);

	patataInterceptor.$inject = ['$q'];
	function patataInterceptor($q)
	{
		var service = {
			'request': request
		};

		return service;

		function request(config)
		{
			if(config.method == 'PUT' || config.method == 'DELETE' || config.method == 'PATCH')
			{
				config.params = config.params || {};
				config.params.PATATA_REST_METHOD = config.method;
				config.method = 'POST';
			}

			return config || $q.when(config);
		}
	}
})();

(function(){
	angular.module('app').config(config);

	config.$inject = ['CONFIG', '$httpProvider'];
	function config(CONFIG, $httpProvider)
	{
		if(CONFIG.convert_now_allowed_to_post) { $httpProvider.interceptors.push('PatataInterceptor'); }
	}
})();