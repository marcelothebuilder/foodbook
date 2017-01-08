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

    $stateProvider.state('recipe-list', {
        url: '/recipe-list',
        templateUrl: 'views/recipe-list.html',
        controller: 'ListRecipeController',
        controllerAs: 'vm'
    });

    $stateProvider.state('recipe-show', {
        url: '/recipe-show/:id',
        templateUrl: 'views/recipe-show.html',
        controller: 'ShowRecipeController',
        controllerAs: 'vm',
        /*@ngInject*/
        resolve: {
            Recipe: ($stateParams, RecipeService) => {
                let id = $stateParams.id;
                return RecipeService.get(id);
            }
        }
    });

    $urlRouterProvider.otherwise('/');
}
