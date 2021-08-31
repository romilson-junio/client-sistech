(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('LoginController', loginController);

        loginController.$inject = ['helperFactory', '$rootScope', 'SisTechService'];

    function loginController(helper, $rootScope, service) {
        var vm = this;
        /* ***************    INIT VARIÁVEIS    *********************************** */
        var usuario = {
            email: '',
            senha: ''
        }
        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.logar = logar;

        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function logar(){
            var usuario = {
                email: vm.usuario.email,
                senha: vm.usuario.senha
            }
            
            return service.logar(usuario)
            .then(function(_resp){
                if(_resp.error){
                    helper.addAlerta('Erro!', 'danger', 'Tente Novamente');
                } else {
                    helper.addAlerta('Sucesso!', 'success','Login Efetuado com Sucesso');
                    $rootScope.perfilLogado = _resp.perfil
                    $rootScope.nomeLogado = _resp.nome
                    helper.path('/menu');
                    
                }
            });
               
        }

    }

})();