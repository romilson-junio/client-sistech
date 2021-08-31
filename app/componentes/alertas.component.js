(function () {
    "use strict";

    angular.module('sisTechApp')
        .component('alertas', {
            templateUrl: 'componentes/alertas.tpl.html',
            controller: 'AlertasController',
            controllerAs: 'vm',
            bindings: {
                ctrl: '=',
                params: '<',
            },
        });

})();