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
            .when('/home', {
                templateUrl: 'home/home.tpl.html',
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
            .when('/clientes', {
                templateUrl: 'clientes/listarClientes.tpl.html',
            })
            .when('/pedidos/cadastro', {
                templateUrl: 'pedidos/cadastro-pedido.tpl.html',
            })
            .when('/produtos/cadastro', {
                templateUrl: 'produtos/cadastro-produto.tpl.html',
            })
            .when('/clientes/cadastro', {
                templateUrl: 'clientes/cadastro-cliente.tpl.html',
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    function configDefaults($rootScope) {
        $rootScope.listaMensagens = [];
    }

})();