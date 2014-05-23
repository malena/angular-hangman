app.constant('JSON_FILE', '../app/words.json');

app.factory("Word", ["$http", "$q", "JSON_FILE", function($http, $q, JSON_FILE){

	/*
	return function() {

		var defer = $q.defer();

		$http.get(JSON_FILE, {cache : true})
			.success(function(data) {
				console.log(data);
				defer.resolve(data.words);
			});

			console.log(defer.promise);
		return defer.promise;

	}
	*/

    var words = [
        "happy",
        "sad",
        "hungry",
        "thirsty"
    ];

    var random_word = words[Math.floor(Math.random() * words.length)];
    var word = random_word.split("");

    return word;

}]);