angular.module('io.github.marcelothebuilder.foodbook')
    .run(configureFirebase);

function configureFirebase() {
    firebase.initializeApp({
        apiKey: 'AIzaSyDqNH1PJvImNkOPxrDvhzCm8recwEJypng',
        authDomain: 'foodbook-b1139.firebaseapp.com',
        databaseURL: 'https://foodbook-b1139.firebaseio.com',
        storageBucket: 'foodbook-b1139.appspot.com',
        messagingSenderId: '1018369366983'
    });
}
