class RecipeService {
    /*@ngInject*/
    constructor($firebaseArray) {
        let firebaseRef = firebase.database().ref().child('recipes');
        this.recipes = $firebaseArray(firebaseRef);
    }

    all() {
        return this.recipes;
    }

    get(id) {
        return this.recipes.$getRecord(id);
    }
}

angular.module('io.github.marcelothebuilder.foodbook').service('RecipeService', RecipeService);
