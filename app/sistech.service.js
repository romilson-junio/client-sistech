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
            incluirProduto: incluirProduto,
            consultarProduto: consultarProduto,
            incluirCliente: incluirCliente,
            listarClientes: listarClientes,
            graficos: graficos
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
        function consultarProduto(_produto){
            return $http.get(constantes.URL_BASE + '/produtos/'+_produto)
            .then(function (response) {
                return response.data;
            }).catch(helper.sendError);
        }
        function incluirUsuario(_usuario){
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
        function incluirCliente(_cliente){
            return $http.post(constantes.URL_BASE + '/clientes/incluir', _cliente)
            .then(function (response) {
                return response.data;
            }).catch(helper.sendError);
        }
        function listarClientes(){
            return $http.get(constantes.URL_BASE + '/clientes')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }
        function graficos() {
            return $http.get(constantes.URL_BASE + '/graficos')
                .then(function (response) {
                    //console.log(response);
                    return response.data;
                })
                .catch(helper.sendError);
        }

    }


})();