(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('ClientesController', clientesController);

        clientesController.$inject = ['helperFactory', '$rootScope', 'SisTechService', '$filter'];

    function clientesController(helper, $rootScope, service, $filter) {
        var vm = this;

        if(!window.localStorage.getItem('isAuthentication')){
            helper.path('/login');
        }
        vm.error = false;
        vm.cadastrar = cadastrar    
        vm.listarClientes = listarClientes;    
        vm.close = close;
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        
        /* ***************    FUNÇÕES INSTERNAS    ******************************** */


        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */


        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function cadastrar(){
            var cliente = {
                id: null,
                email: vm.cliente.email,
                nome: vm.cliente.nome,
                cpf: vm.cliente.cpf,
                enderecos: _getEndereco()
            }
            return service.incluirCliente(cliente)
            .then(function(_resp){
                if(_resp.error){
                    helper.addAlerta('Erro!', 'danger', 'Tente Novamente');
                    vm.error = true;
                    vm.errorMessage = _resp.msg;
                } else {
                    vm.error = false;
                    helper.path('/clientes');
                    helper.addAlerta('Cadastro Realizado com Sucesso', 'success');
                    
                }
            });
                        
        }

        function _getEndereco(){
            return [
                {
                    id: null,
                    cep: vm.cliente.cep,
                    rua: vm.cliente.rua,
                    cidade: vm.cliente.cidade,
                    estado: vm.cliente.estado,
                    complemento: vm.cliente.complemento,
                }
            ]
        }

        function listarClientes(){
            return service.listarClientes()
            .then(function (_listaClientes) {
                vm.listaClientes = _listaClientes;
            });
        }

        function close(){
            vm.error = false;
        }

    }

})();