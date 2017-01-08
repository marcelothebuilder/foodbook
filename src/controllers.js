class AddRecipeController {
    /*@ngInject*/
    constructor(RecipeService, $ionicModal, $ionicPopup, $scope, $state) {
        this.recipeService = RecipeService;

        this.$ionicModal = $ionicModal;

        this.$ionicPopup = $ionicPopup;

        this.configureIngredientsModal($scope);

        this.$state = $state;

        this.clearInput();
    }

    recipe() {
        return this.newRecipe;
    }

    isValidRecipe() {
        return this.areIngredientsValid() && this.isValidName() && this.areInstructionsValid();
    }

    areIngredientsValid() {
        return this.isValidIngredientQuantity();
    }

    isValidName() {
        return this.recipe().name.length > 3;
    }

    areInstructionsValid() {
        return this.recipe().instructions.length > 10;
    }

    isValidIngredientQuantity() {
        return this.recipe().ingredients.length > 0;
    }

    openIngredientsEdit() {
        this.ingredientsModal.show();
    }

    closeIngredientsEdit() {
        this.ingredientsModal.hide();
    }

    addIngredient(name, amount = 1) {
        let ingredient = {
            name: name,
            amount: amount
        };

        this.recipe().ingredients.push(ingredient);
    }

    addNewRecipe() {
        this.recipeService.add(this.recipe().name, this.recipe().ingredients, this.recipe().instructions)
            .then(() => {
                return this.$ionicPopup.alert({
                        title: 'New recipe added.',
                        template: `Your ${this.recipe().name} recipe has been added to the system.`
                    })
                    .then(() => this.clearInput())
                    .then(() => this.goHome());
            });
    }

    configureIngredientsModal($scope) {
        this.$ionicModal.fromTemplateUrl('views/recipe-add-ingredients.modal.html', {
            animation: 'slide-in-up',
            scope: $scope
        }).then((modalController) => {
            this.ingredientsModal = modalController;

            $scope.closeIngredientsEdit = () => {
                this.closeIngredientsEdit();
            };

            $scope.addIngredient = ({
                name,
                amount
            }) => {
                console.log('$scope', $scope);

                this.addIngredient(name, amount);
            };

            $scope.ingredients = () => {
                return this.recipe().ingredients;
            };

            $scope.$on('$destroy', () => {
                this.ingredientsModal.remove();
            });
        });
    }

    clearInput() {
        this.newRecipe = {
            name: '',
            ingredients: [],
            instructions: ''
        };
    }

    goHome() {
        this.$state.transitionTo('home');
    }
}

angular.module('io.github.marcelothebuilder.foodbook').controller('AddRecipeController', AddRecipeController);
