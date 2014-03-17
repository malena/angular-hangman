var app = angular.module("hanglady", []);

app.factory("WordPicker", function(){

    var words = [ 
        "happy",
        "sad",
        "hungry",
        "thirsty"
    ]; 

    function pickRandomItem (list) {

        function randomIndexGenerator (){
            var random = Math.round(Math.random() * (list.length) + 0);

            if(random == words.length){
               return random - 1; 
            }
            return random;
        };

        if (list[randomIndexGenerator()] === undefined){
            return list[0];
        } 

        return list[randomIndexGenerator()];
    }

    var random_word = pickRandomItem(words);

    return random_word;
});

app.factory("Guess", function(){
    var guess = {
        letter: "?",
        allLetterGuesses: [],
        correctLetterGuesses: []
    };
    return guess;
});

app.controller("MainCtrl", ["$scope", "WordPicker", function($scope, WordPicker){
    $scope.word = WordPicker;
    $scope.letterArray = $scope.word.split("");

}]);

app.controller("WordCtrl", ["$scope", function ($scope){
}]);

app.controller("GuessCtrl", ["$scope", "Guess", function ($scope, Guess){

    $scope.guess = Guess;

    $scope.$watchCollection('guess', function() {

        if(!$scope.guess || $scope.guess.letter === "" ){
            return false;
        } else {
            angular.forEach($scope.letterArray, function(key){
                if($scope.guess.letter === key){
                    alert('flipQ');
                    Guess.correctLetterGuesses.push($scope.guess.letter);
                    return true;
                }
            });
        }

        Guess.allLetterGuesses.push($scope.guess.letter);
    });

}]);