var app = angular.module("hanglady", []);

app.factory("Word", function(){

    var words = [ 
        "happy",
        "sad",
        "hungry",
        "thirsty"
    ]; 

    function randomWord (list) {

        function random(){
            var random = Math.round(Math.random() * (list.length) + 0);

            if(random == words.length){
                return random - 1; 
            }

            return random;
        };

        if (list[random()] === undefined){
            return list[0];
        } 

        return list[random()];
    }

    return randomWord(words);
});

app.factory("Guess", function(){
    var guess = {
        letter: "?",
        allLetterGuesses: [],
        correctLetterGuesses: [],
        correctWord: []
    };
    return guess;
});

app.controller("MainCtrl", ["$scope", "Word", function($scope, Word){
    $scope.word = Word;
    $scope.letters = angular.element($scope.word.split(""));
}]);

app.controller("WordCtrl", ["$scope", function ($scope){
}]);

app.controller("GuessCtrl", ["$scope", "Guess", function ($scope, Guess){

    $scope.guess = Guess;

    $scope.$watchCollection('guess', function() {

        if(!$scope.guess || $scope.guess.letter === "" ){
            return false;
        } else {
            angular.forEach($scope.letters, function(key, index){
                if($scope.guess.letter === key){
                    Guess.correctLetterGuesses.push($scope.guess.letter);
                    return true;
                }
            });
        }

        Guess.allLetterGuesses.push($scope.guess.letter);
    });

}]);

app.directive('myRepeatDirective', ['Guess', function(Guess){

    var count = 0;

    function link(scope, element, attrs) {

        scope.guess = Guess;

        scope.$watchCollection('guess', function() {

            if(scope.letter === " " || scope.letter == "?"){
                return false;

            } else {
                angular.forEach(scope.letter, function(key, index){

                    if(scope.guess.letter === key){
                        angular.element(element).css('border', '5px solid red');
                        scope.flip = true;
                        scope.guess.guessed = true;
                        count = count + 1;

                        if(count == scope.word.length){
                            alert('word guessed!'); 
                        }

                    } else {
                        scope.guess.guessed = false;
                    }
                });
            }
        });
    }

    return {
        link: link,
        scope: false,
        transclude: false
    };
}]);