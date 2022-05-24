(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('HeaderController', headerController);

    headerController.$inject = ['helperFactory', '$rootScope'];

    function headerController(helper, $rootScope) {
        var vm = this;
        vm.usuarioLogado = {
            
            perfil: window.localStorage.getItem('perfil'),
            nome: window.localStorage.getItem('nome')
        }
        vm.sair = sair
        vm.home = home;
        /* ***************    INIT VARIÁVEIS    *********************************** */
            
         
        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        

        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function sair() {
            $rootScope.perfilLogado = ''
            $rootScope.nomeLogado = ''
            window.localStorage.clear()
            helper.path('/login');
        }

        function home(){
            helper.path('/home');
        }



    }

})();