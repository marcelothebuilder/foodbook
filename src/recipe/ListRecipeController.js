class ListRecipeController {
    /*@ngInject*/
    constructor(RecipeService, $state) {
        this.recipeService = RecipeService;
        this.$state = $state;
    }

    recipes() {
        return this.recipeService.all();
    }

    showRecipe(recipe) {
        return this.$state.transitionTo('recipe-show', {
            id: recipe.$id
        });
    }
}

angular.module('io.github.marcelothebuilder.foodbook.recipe').controller('ListRecipeController', ListRecipeController);
