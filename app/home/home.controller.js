(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('HomeController', homeController);

        homeController.$inject = ['helperFactory', '$rootScope', 'SisTechService'];

    function homeController(helper, $rootScope, service) {
        var vm = this;

        if(!window.localStorage.getItem('isAuthentication')){
            helper.path('/login');
        }
        
        vm.go = helper.go;
        vm.iniciar = iniciar;
    
        vm.graficoClientes = {};
        vm.graficoClientes.error = false;
        vm.graficoVendedor = {};
        vm.graficoVendedor.error = false;
        vm.graficoVendas = {};
        vm.graficoVendas.error = false;
        vm.graficoProdutos = {};
        vm.graficoProdutos.error = false;
        
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.page = page;

        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function page(_params) {
            helper.path('/'+_params);
        }

        
        function iniciar() {
            vm.go();
            initGraficos();
        }   

        function initGraficos(){
            return service.graficos()
            .then(function (_graficos) {
                vm.graficoClientes = _graficos.graficoCliente;
                if(vm.graficoClientes.descricoes.length == 0){
                    vm.graficoClientes.error = true;
                }
                vm.graficoClientes.colors = ['#FF5733', '#4D5360', '#00ADF9'];
                
                vm.graficoVendedor = _graficos.graficoVendedor;
                vm.graficoVendedor.colors = ['#FF5733', '#4D5360', '#00ADF9'];
                if(vm.graficoVendedor.descricoes.length == 0){
                    vm.graficoVendedor.error = true;
                }
                
                vm.graficoProdutos = _graficos.graficoProdutos;
                vm.graficoProdutos.colors = ['#FF5733', '#4D5360', '#00ADF9'];
                if(vm.graficoProdutos.descricoes.length == 0){
                    vm.graficoProdutos.error = true;
                }

                vm.graficoVendas = _graficos.graficoVendas;
                vm.graficoVendas.colors = ['#FFFFFF'];
                vm.graficoVendas.options = {
                    scales: {
                      yAxes: [
                        {
                          id: 'y-axis-1',
                          type: 'linear',
                          display: true,
                          position: 'left'
                        },
                        {
                          id: 'y-axis-2',
                          type: 'linear',
                          display: true,
                          position: 'right'
                        }
                      ]
                    }
                  };
                vm.graficoVendas.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

            });
        } 
    }

})();