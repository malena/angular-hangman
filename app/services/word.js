app.service('WordService', ['$http', '$q', function($http, $q) {
	this.randomWord = function () {
        return $http.get('/random-word');
    };
}]);

