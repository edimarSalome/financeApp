financeApp.controller("detalhesCtrl",['$scope','$sce','utils','$state','$stateParams', function($scope,$sce, utils, $state, $stateParams){
        var $ctrl = this;
        var $db = firebase.database();
        
        $ctrl.construct = function(){
            if($stateParams.conta){
                $scope.conta = $stateParams.conta;
            }else{
                $state.go('principal');
            }
        };
        
        $ctrl.construct();
}]);
