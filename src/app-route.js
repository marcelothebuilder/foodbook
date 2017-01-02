angular.module('io.github.marcelothebuilder.foodbook')
    .config(configStates);

/*@ngInject*/
function configStates($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'views/home.html'
    });

    $urlRouterProvider.otherwise('/');
}
