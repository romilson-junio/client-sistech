(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('FooterController', footerController);

        footerController.$inject = ['helperFactory', '$rootScope', '$location',];

    function footerController(helper, $rootScope, $location) {
        var vm = this;
        vm.usuarioLogado = {
            perfil: $rootScope.perfilLogado,
            nome: $rootScope.nomeLogado
        }
        vm.path = path

        /* ***************    INIT VARIÁVEIS    *********************************** */
            
         
        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        

        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function path(){
            return $location.path()
        }

    }

})();