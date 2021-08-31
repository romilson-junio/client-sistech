(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('MenuController', menuController);

        menuController.$inject = ['helperFactory', '$rootScope'];

    function menuController(helper, $rootScope) {
        var vm = this;

        vm.usuarioLogado = {
            perfil: $rootScope.perfilLogado,
            nome: $rootScope.nomeLogado
        }

        vm.go = helper.go;
        vm.iniciar = iniciar;
        vm.validarPerfil = validarPerfil
        
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.page = page;

        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function page(_params) {
            helper.path('/'+_params);
        }

        function validarPerfil(){
            if(vm.usuarioLogado.perfil == 'Gerente'){
                vm.links = ["Pedidos", "Produtos", "Clientes", "Usuarios"]
            } else if(vm.usuarioLogado.perfil == 'Vendedor'){
                vm.links = ["Pedidos", "Produtos", "Clientes"]
            } else if(vm.usuarioLogado.perfil == 'Estoquista'){
                vm.links = ["Produtos"]
            } else if(vm.usuarioLogado.perfil == 'Administrador'){
                vm.links = ["Usuarios"]
            }
        }   
        function iniciar() {
            vm.go();
        }     

    }

})();