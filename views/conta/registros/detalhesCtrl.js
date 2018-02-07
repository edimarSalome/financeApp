financeApp.controller("detalhesCtrl",['$scope','$sce','utils','$state','$stateParams', function($scope,$sce, utils, $state, $stateParams){
        var $ctrl = this;
        var $db = firebase.database();
        
        $ctrl.construct = function(){
            if($stateParams.conta){
                $ctrl.conta = $stateParams.conta;
                $ctrl.getDetalhes();
            }else{
                $state.go('principal');
            }
        };
        
        $ctrl.getDetalhes = function(){
            $scope.registros = [];
            
            $db.ref('/registros/'+$ctrl.conta.id).on('value', function(snapshot) {
                var test=snapshot.val();
                try{
                    $ctrl.registros = utils.firebaseArrayNoChild(snapshot);
                    $ctrl.registros.reverse();
                    $scope.charged=true;
                }finally {
                    $scope.$apply(function(){
                        $ctrl.registros = utils.firebaseArrayNoChild(snapshot);
                        $ctrl.registros.reverse();
                        $scope.charged=true;
                    });
                }
            });
        };
        
        $ctrl.construct();
}]);
