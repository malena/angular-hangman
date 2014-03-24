var app = angular.module("hanglady", []);

app.factory("Word", function(){
    var words = [ 
        "happy",
        "sad",
        "hungry",
        "thirsty"
    ]; 
    var word = words[Math.floor(Math.random() * words.length)];
    return word.split("");
});

app.factory("Guess", function(){
    var guess = {
        letter: "?",
        allLetterGuesses: [],
        correctLetterGuesses: []
    };
    return guess;
});

app.controller("WordCtrl", ["$scope", "Word", "Guess", function ($scope, Word, Guess){
    $scope.word = Word;
    $scope.letters = angular.element($scope.word);

    $scope.guess = Guess;
    var match;

    $scope.$watchCollection('guess', function() {
        if($scope.guess.letter == ""){
           return; 
        } else {
            angular.forEach($scope.letters, function(key, index){
                if(key == $scope.guess.letter){
                    Guess.correctLetterGuesses[index] = $scope.guess.letter;
                }
            });
            match = _.isEqual(Guess.correctLetterGuesses, $scope.word);
        }
        if(match == true){
            alert('matched!')
            return;
        }
    });
}]);

app.controller("GuessCtrl", ["$scope", "Guess", function ($scope, Guess){
    $scope.guess = Guess;
}]);

app.directive('myRepeatDirective', ['Guess', function(Guess){
    function link(scope, element, attrs) {
        scope.guess = Guess;
        scope.$watchCollection('guess', function(){
            angular.forEach(scope.letter, function(key, index){
                if(scope.guess.letter === key){
                    angular.element(element).css('border', '5px solid red');
                    scope.flip = true;
                    // TODOF: move cursor to begining 
                } 
            });
        });
    }
    return {
        link: link,
        scope: false,
        transclude: false
    };
}]);