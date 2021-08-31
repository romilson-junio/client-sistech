(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('PedidosController', pedidosController);

        pedidosController.$inject = ['helperFactory', '$rootScope', 'SisTechService', '$filter'];

    function pedidosController(helper, $rootScope, service, $filter) {
        var vm = this;
        
        var data = "2016-02-18T10:23Z";
        vm.dataFormatada = $filter('date')(data, 'dd/MM/yyyy');
        
        vm.produtos = [];
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
            vm.produtos.forEach(element => {
                valorTotalPedido += element.valorTotal
            });
            var pedido = {
                cpfCliente: vm.pedido.cpfCliente,
                produtos: vm.produtos,
                vendedor: $rootScope.nomeLogado,
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
            var valorProduto;
            var nomeProduto;
            var margemLucroSelecionada;
            var valorTotal;
            vm.listaProdutos.forEach(element => {
                if(element.codigo == vm.produtos.produto){
                    valorProduto = element.valor
                    nomeProduto = element.produto
                    margemLucroSelecionada = element.margenLucro
                    valorTotal = vm.produtos.quantidade * valorProduto
                }
            });
            vm.produtos.push({ produto: nomeProduto, quantidade: vm.produtos.quantidade, valor: valorProduto, margemLucro: margemLucroSelecionada, valorTotal: valorTotal })
        }


    }

})();