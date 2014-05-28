app.constant('JSON_FILE', '../app/words.json');


app.service('WordService', ['$http', '$q', 'JSON_FILE', function($http, $q, JSON_FILE) {
    return $http.get('/random-word');
}]);
