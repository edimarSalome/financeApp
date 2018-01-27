financeApp.controller("mainCtrl",['$scope','$sce','utils','$state', function($scope,$sce, utils, $state){
        var $ctrl = this;
        var $db = firebase.database();
        
        $ctrl.construct = function(){
            $ctrl.userId=1;
            $ctrl.contas = [];
            $ctrl.getContas();
            $scope.charged=false;
        };
        
        $ctrl.getContas = function(){            
            $db.ref('/contas').orderByChild('/'+$ctrl.userId).limitToFirst(1).once('value', function(snapshot) {
                $scope.$apply(function(){
                    $ctrl.contas = utils.firebaseArray(snapshot);
                    $scope.charged=true;
                });
            });
        };
        
        $ctrl.getSaldoTotal = function(){
            var saldoTotal = 0;
            $ctrl.contas.forEach(function(value, key){
                saldoTotal += parseInt(value.saldo);
            });
            
            return saldoTotal;
        };
        
        $scope.novaConta = function(){$state.go('addConta', {inside:true});};
        
        $scope.detalhesConta = function(conta){$state.go('conta', {conta: conta});};
        $scope.openOptions = function(){$scope.options=!$scope.options;}
        $scope.novoRegistro = function(tipo){ $state.go('registrar', {tipo: tipo}); };
        
        $ctrl.construct();
}]);