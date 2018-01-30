financeApp.controller("novoRegistroCtrl",['$scope','$sce','utils','$state','$stateParams','$filter', function($scope,$sce, utils, $state, $stateParams, $filter){
        var $ctrl = this;
        var $db = firebase.database();
        
        $ctrl.construct = function(){
            $ctrl.userId = 1;
            $scope.registro = {tipo: $stateParams.tipo, categoria:null, valor:0, descricao:null, data:new Date(), conta:null, situacao:'Realizado'};
            $ctrl.getContas();
            /*$db.ref('/contas/'+$ctrl.userId+'/'+$scope.registro.conta+'/saldo').once('value').then(function(snapshot){
                
            });*/
        };
        
        $scope.registrar = function(){
            if($ctrl.validarRegistro()){
                $scope.registro.data = $filter('date')($scope.registro.data, 'MM-dd-yyyy');
                
                if($scope.registro.tipo==='entrada'){
                    var novoSaldo = $ctrl.getSaldoAtual($scope.registro.conta)+$scope.registro.valor;
                    $db.ref('/contas/'+$ctrl.userId+'/'+$scope.registro.conta+'/saldo').set(novoSaldo);
                    $db.ref('/registros/'+$scope.registro.conta).push($scope.registro);                    
                }else if($scope.registro.tipo==='despesa'){
                    var novoSaldo = $ctrl.getSaldoAtual($scope.registro.conta)-$scope.registro.valor;
                    $db.ref('/contas/'+$ctrl.userId+'/'+$scope.registro.conta+'/saldo').set(novoSaldo);
                    $db.ref('/registros/'+$scope.registro.conta).push($scope.registro);
                }
                
                $state.go('principal');
            }
        };
        
        $ctrl.validarRegistro = function(){
            $scope.invalidForm = false;
            $scope.msg = 'Informe todos os campos';
            var count = 0;
            
            if(!$scope.registro.tipo)count++;            
            if(!$scope.registro.categoria)count++;            
            if(!$scope.registro.valor)count++;            
            if(!$scope.registro.descricao)count++;            
            if(!$scope.registro.data)count++;            
            if(!$scope.registro.conta)count++;            
            if(!$scope.registro.situacao)count++;
            
            if(count){$scope.invalidForm = true; return false;}
           else{return true;}
        };
        
        $ctrl.getContas = function(){            
            $db.ref('/contas').orderByChild('/'+$ctrl.userId).limitToFirst(1).once('value', function(snapshot) {
                $scope.$apply(function(){
                    $ctrl.contas = utils.firebaseArray(snapshot);
                    $scope.charged=true;
                });
            });
        };
        
        $ctrl.getSaldoAtual = function(idConta){
            var retorno = null;
            
            $ctrl.contas.forEach(function(value, key){
                if(value.id===idConta){retorno = value.saldo;}
            });
            
            return retorno;
        };
        
        $ctrl.construct();
}]);