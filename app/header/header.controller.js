(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('HeaderController', headerController);

    headerController.$inject = ['helperFactory', '$rootScope'];

    function headerController(helper, $rootScope) {
        var vm = this;
        vm.usuarioLogado = {
            perfil: $rootScope.perfilLogado,
            nome: $rootScope.nomeLogado
        }
        vm.sair = sair
        /* ***************    INIT VARIÁVEIS    *********************************** */
            
         
        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        

        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function sair() {
            $rootScope.perfilLogado = ''
            $rootScope.nomeLogado = ''
            helper.path('/login');
        }

    }

})();