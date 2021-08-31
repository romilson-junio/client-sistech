(function () {
    "use strict";

    angular.module('sisTechApp')
        .config(routes)
        .run(configDefaults);

    routes.$inject = ['$routeProvider'];
    configDefaults.$inject = ['$rootScope'];

    function routes($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'login/login.tpl.html',
            })
            .when('/menu', {
                templateUrl: 'menu/menu.tpl.html',
            })
            .when('/pedidos', {
                templateUrl: 'pedidos/pedidos.tpl.html',
            })
            .when('/pedidos/detalhar', {
                templateUrl: 'pedidos/detalhar-pedido.tpl.html',
            })
            .when('/produtos', {
                templateUrl: 'produtos/produtos.tpl.html',
            })
            .when('/usuarios', {
                templateUrl: 'usuarios/usuarios.tpl.html',
            })
            .when('/pedidos/cadastro', {
                templateUrl: 'pedidos/cadastro-pedido.tpl.html',
            })
            .when('/produtos/cadastro', {
                templateUrl: 'produtos/cadastro-produto.tpl.html',
            })
            .otherwise({
                redirectTo: '/menu'
            });
    }

    function configDefaults($rootScope) {
        $rootScope.listaMensagens = [];
    }

})();