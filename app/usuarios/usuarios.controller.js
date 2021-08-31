(function () {
    "use strict";

    angular.module('sisTechApp')
        .controller('UsuariosController', usuariosController);

        usuariosController.$inject = ['helperFactory', '$rootScope', 'SisTechService', '$filter'];

    function usuariosController(helper, $rootScope, service, $filter) {
        var vm = this;
        vm.cadastrar = cadastrar        
        
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        
        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function gerarSenha(_cpf){
            console.log(_cpf)
            return _cpf.substring(0,6);
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */


        /* ***************    FUNÇÕES INSTERNAS    ******************************** */
        function cadastrar(){
            var senhaCadastro = gerarSenha(vm.usuario.cpf);
            console.log(senhaCadastro)
            var usuario = {
                email: vm.usuario.email,
                nome: vm.usuario.nome,
                cpf: vm.usuario.cpf,
                senha: senhaCadastro,
                perfil: vm.usuario.perfil
            }
            return service.incluirUsuario(usuario)
            .then(function(_resp){
                if(_resp.error){
                    helper.addAlerta('Erro!', 'danger', 'Tente Novamente');
                } else {
                    helper.path('/menu');
                    helper.addAlerta('Cadastro Realizado com Sucesso', 'success');
                    
                }
            });
                        
        }

    }

})();