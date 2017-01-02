'use strict';

(function () {
    'use strict';

    angular.element(document).ready(function () {
        if (window.cordova) {
            document.addEventListener('deviceready', function () {
                angular.bootstrap(document.body, ['io.github.marcelothebuilder.foodbook']);
            }, false);
        } else {
            angular.bootstrap(document.body, ['io.github.marcelothebuilder.foodbook']);
        }
    });
})();
//# sourceMappingURL=app-bootstrap.js.map
