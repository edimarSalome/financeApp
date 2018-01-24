financeApp.controller("novaContaCtrl",['$scope','$sce','$state','$stateParams', function($scope,$sce, $state, $stateParams){
    var $ctrl = this;
    var $db = firebase.database();
    
    $ctrl.construct = function(){
        $ctrl.userId=1;
        //$routeParams.inside?$ctrl.setStep(2):$ctrl.setStep(1);
        $stateParams.inside?$ctrl.setStep(2):$ctrl.setStep(1);
        $scope.conta={};
    };
    
    $ctrl.setStep = function(step){$ctrl.step=step;};    
    $scope.isStep = function(step){return $ctrl.step===step;};
    
    $scope.equilibrarContas = function(){$ctrl.setStep(2);};
    $scope.salvarNomeConta = function(){$ctrl.setStep(3);};
    $scope.salvarTipoConta = function(){$ctrl.setStep(4);};
    $scope.cadastrarConta = function(){
        $db.ref('/contas/'+$ctrl.userId).push($scope.conta);
        $state.go('principal');
    };
    
    $ctrl.construct();
}]);

