financeApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('principal', {
        url: '/',
        templateUrl: 'views/main/principal.html',
        controller: 'mainCtrl',
        controllerAs: '$ctrl'
    })
    .state('addConta', {
        url: '/addConta/{inside}',
        templateUrl: 'views/conta/novaConta.html',
        controller: 'novaContaCtrl',
        controllerAs: '$ctrl'
    })
    .state('conta', {
        url: '/conta',
        templateUrl: 'views/conta/registros/detalhes.html',
        controller: 'detalhesCtrl',
        controllerAs: '$ctrl',
        params: {
            conta: null
        }
    })
    
;}]);