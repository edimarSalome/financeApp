var financeApp=angular.module('financeApp',['ngSanitize', 'ui.router'])
.factory('utils', [function(){
    function firebaseArray(snapshot){
        var arrayReturn = [];
        
        snapshot.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(item){
                var obj = item.val(); 
                obj.id = item.key;
                arrayReturn.push(obj);
        });});
    
         return arrayReturn;
    };
    
    return{
        firebaseArray:firebaseArray
    };
}]);

