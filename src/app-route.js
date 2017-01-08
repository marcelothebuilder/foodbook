angular.module('io.github.marcelothebuilder.foodbook')
    .config(configStates);

/*@ngInject*/
function configStates($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'views/home.html'
    });

    $stateProvider.state('recipe-add', {
        url: '/recipe-add',
        templateUrl: 'views/recipe-add.html',
        controller: 'AddRecipeController',
        controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
}
