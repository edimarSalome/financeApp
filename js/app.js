var financeApp=angular.module('financeApp',['ngSanitize', 'ui.router','ui.utils.masks'])
.factory('utils', [function(){
    function firebaseArray(snapshot){
        var arrayReturn = [];
        
        snapshot.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(item){
                var obj = item.val(); 
                obj.id = item.key;
                if(obj.data){obj.data = new Date(obj.data);}
                arrayReturn.push(obj);
        });});
    
         return arrayReturn;
    };
    
    function firebaseArrayNoChild(snapshot){
        var arrayReturn = [];
        
        snapshot.forEach(function(item) {
            var obj = item.val(); 
            obj.id = item.key;
            if(obj.data){obj.data = new Date(obj.data);}
            arrayReturn.push(obj);
        });
    
         return arrayReturn;
    };
    
    return{
        firebaseArray:firebaseArray,
        firebaseArrayNoChild:firebaseArrayNoChild
    };
}]);

