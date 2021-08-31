(function () {
    "use strict";

    angular.module('sisTechApp')
        .service('SisTechService', sisTechService);

        sisTechService.$inject = ['$http', 'constantes', 'helperFactory'];

    function sisTechService($http, constantes, helper) {

        return {
            logar: logar,
            listarPedidos: listarPedidos,
            listarProdutos: listarProdutos,
            incluirPedido: incluirPedido,
            incluirUsuario: incluirUsuario,
            incluirProduto: incluirProduto
        }

        // ======================================

        function logar(usuario) {
            //console.log(usuario)
            return $http.post(constantes.URL_BASE + '/usuarios/logar', usuario)
                .then(function (response) {
                    //console.log(response.data);
                    return response.data;
                })
                .catch(helper.sendError);
        }
        function incluirPedido(_pedido){
            //console.log(_pedido);
            return $http.post(constantes.URL_BASE + '/pedidos/incluir', _pedido)
            .then(function (response) {
                return response.data;
            }).catch(helper.sendError);
        }
        function incluirProduto(_produto){
            //console.log(_pedido);
            return $http.post(constantes.URL_BASE + '/produtos/incluir', _produto)
            .then(function (response) {
                return response.data;
            }).catch(helper.sendError);
        }
        function incluirUsuario(_usuario){
            //console.log(_pedido);
            return $http.post(constantes.URL_BASE + '/usuarios/incluir', _usuario)
            .then(function (response) {
                return response.data;
            }).catch(helper.sendError);
        }
        function listarPedidos() {
            return $http.get(constantes.URL_BASE + '/pedidos')
                .then(function (response) {
                    //console.log(response);
                    return response.data;
                })
                .catch(helper.sendError);
        }
        function listarProdutos() {
            return $http.get(constantes.URL_BASE + '/produtos')
                .then(function (response) {
                    //console.log(response);
                    return response.data;
                })
                .catch(helper.sendError);
        }

    }


})();