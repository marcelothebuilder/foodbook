class ShowRecipeController {
    /*@ngInject*/
    constructor(Recipe) {
        this._recipe = Recipe;
    }

    recipe() {
        return this._recipe;
    }

}

angular.module('io.github.marcelothebuilder.foodbook.recipe').controller('ShowRecipeController', ShowRecipeController);
