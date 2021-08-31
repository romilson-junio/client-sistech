(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('ProdutosController', produtosController);

        produtosController.$inject = ['helperFactory', '$rootScope', 'SisTechService', '$filter'];

    function produtosController(helper, $rootScope, service, $filter) {
        var vm = this;
        
        
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.iniciar = iniciar;
        vm.listarProdutos = listarProdutos;
        vm.cadastrar = cadastrar;
        vm.baixoEstoque = baixoEstoque;
        vm.listarBaixoEstoque = listarBaixoEstoque;
        
        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
 
        function iniciar() {
            return vm.listarProdutos();
        }
        function baixoEstoque(){
            return vm.listarBaixoEstoque();
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */


        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        
        function cadastrar(){
            
            var produto = {
                produto: vm.produto.produto,
                quantidade: vm.produto.quantidade,
                valor: vm.produto.valor,
                margenLucro: vm.produto.margenLucro
            }
            console.log(produto)
            return service.incluirProduto(produto)
            .then(function(_resp){
                if(_resp.error){
                    helper.addAlerta('Erro!', 'danger', 'Tente Novamente');
                } else {
                    helper.addAlerta('Cadastro Realizado com Sucesso', 'success');
                    helper.path('/produtos');
                }
            });
                        
        }
        
        function listarProdutos() {
            return service.listarProdutos()
            .then(function (_listaProdutos) {
                console.log(_listaProdutos)
                vm.listaProdutos = _listaProdutos;
            });
        }
        function listarBaixoEstoque(){
            
            let produtos = []
            service.listarProdutos().then(function (_listaProdutos) { 
                
                _listaProdutos.forEach(produto => {
                    if(produto.quantidade < 15){
                        produtos.push(produto)
                    }
                })
                
            });
            console.log(produtos)
            vm.produtosBaixoEstoque = produtos


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