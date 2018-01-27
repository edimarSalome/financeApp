financeApp.controller("novoRegistroCtrl",['$scope','$sce','utils','$state','$stateParams', function($scope,$sce, utils, $state, $stateParams){
        var $ctrl = this;
        var $db = firebase.database();
        
        $ctrl.construct = function(){
            $scope.registro = {tipo: $stateParams.tipo, categoria:null, valor:0, descricao:null, data:null, conta:null};
        };
        
        $ctrl.construct();
}]);