(function () {
    "use strict";

    angular.module('sisTechApp')
        .constant('constantes', {
            URL_BASE: 'http://localhost:8080/api',
            MSGS: {
                ERRO_GERAL: 'Ocorreu algum problema. Tente novamente mais tarde.',
            },
        });

})();