(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('PedidosController', pedidosController);

        pedidosController.$inject = ['helperFactory', '$rootScope', 'SisTechService', '$filter'];

    function pedidosController(helper, $rootScope, service, $filter) {
        var vm = this;
        
        var data = "2016-02-18T10:23Z";
        vm.dataFormatada = $filter('date')(data, 'dd/MM/yyyy');
        
        if(!window.localStorage.getItem('isAuthentication')){
            helper.path('/login');
        }

        vm.produtos = [];
        vm.adicionados = [];
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.add = add
        vm.iniciar = iniciar;        
        vm.pedido = pedido;
        vm.listarPedidos = listarPedidos;
        vm.listarProdutos = listarProdutos;
        vm.cadastrar = cadastrar;
        vm.redirecionar = redirecionar;        
        vm.pedidoDetalhar = pedidoDetalhar;
        vm.getValorTotalPedido = getValorTotalPedido;
        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
 
        function iniciar() {
            return vm.listarPedidos(), vm.listarProdutos();
        }
        function pedido(){
            return vm.pedidoDetalhar();
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */


        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function cadastrar(){
            var valorTotalPedido = 0;
            vm.adicionados.forEach(element => {
                valorTotalPedido += element.valorTotal
            });
            var pedido = {
                cliente: vm.pedido.cpfCliente,
                produtos: vm.adicionados,
                vendedor: window.localStorage.getItem('id'),
                valorTotal: valorTotalPedido
            }
            return service.incluirPedido(pedido)
            .then(function(_resp){
                if(_resp.error){
                    helper.addAlerta('Erro!', 'danger', 'Tente Novamente');
                } else {
                    helper.addAlerta('Cadastro Realizado com Sucesso', 'success');
                    helper.path('/pedidos');
                }
            });
                        
        }

        function listarPedidos() {
            return service.listarPedidos()
            .then(function (_listaPedidos) {
                vm.listaPedidos = _listaPedidos;
            });
        }
        function listarProdutos() {
            return service.listarProdutos()
            .then(function (_listaProdutos) {
                vm.listaProdutos = _listaProdutos;
            });
        }
        function pedidoDetalhar(){
            console.log($rootScope.pedido)
            return vm.pedidoDetalhado = $rootScope.pedido;
        }
        function redirecionar(_pedido){
            $rootScope.pedido = _pedido
            helper.path('/pedidos/detalhar')
        }
        function add() {
            var produto = vm.listaProdutos.find(function (element) {
                return element.codigo == vm.produtos.produto;
            }); 

            var codigo = produto.codigo;
            var valorProduto = produto.valor;
            var nomeProduto = produto.produto;
            var quantidade = vm.produtos.quantidade;
            var valorTotal = vm.produtos.quantidade * valorProduto;
            
            vm.adicionados.push({idProduto: codigo, produto: nomeProduto, quantidade: quantidade, valor: valorProduto, valorTotal: valorTotal });
        }
        function getValorTotalPedido(){
            if(vm.produtos){
                var valor = 0;
                vm.adicionados.forEach(item => {
                    valor += item.valorTotal
                })
                valor += ''
                return 'R$ '+(valor.replace('.',','));
            }
            return 'R$ ';
        }

    }

})();