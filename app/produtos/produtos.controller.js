(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('ProdutosController', produtosController);

        produtosController.$inject = ['helperFactory', '$rootScope', 'SisTechService', '$filter'];

    function produtosController(helper, $rootScope, service, $filter) {
        var vm = this;
        
        if(!window.localStorage.getItem('isAuthentication')){
            helper.path('/login');
        }

        vm.disabled = true;
        
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.iniciar = iniciar;
        vm.listarProdutos = listarProdutos;
        vm.cadastrar = cadastrar;
        vm.baixoEstoque = baixoEstoque;
        vm.listarBaixoEstoque = listarBaixoEstoque;
        vm.editar = editar;
        vm.deletar = deletar;
        vm.consultarProduto = consultarProduto;
        
        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
 
        function iniciar() {
            return vm.listarProdutos();
        }
        function baixoEstoque(){
            return vm.listarBaixoEstoque();
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */


        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        
        function cadastrar(produto){
            var produto = {
                produto: produto.produto,
                quantidade: produto.quantidade,
                valor: produto.valor,
                margenLucro: produto.margenLucro
            }
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

        function editar(produto){
            console.log(produto);
        }

        function deletar(produto){
            console.log(produto);
        }

        function consultarProduto(produto){
            if(produto){
                service.consultarProduto(produto)
                .then(function(_resp){
                    if(_resp.error){
                        vm.disabled = false;
                    } else {
                        vm.disabled = true;
                        helper.addAlerta('Erro!', 'danger', 'Produto já cadastrado');
                    }
                });
            }
        }

    }

})();