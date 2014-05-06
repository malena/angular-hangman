var app = angular.module("hanglady", []);

app.factory("Alphabet", function(){
    var alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
    ];

    return alphabet;
});

app.factory("Word", function(){
    var words = [
        "happy",
        "sad",
        "hungry",
        "thirsty"
    ];

    var random_word = words[Math.floor(Math.random() * words.length)];
    var word = random_word.split("");

    return word;
});

app.factory("Guess", function(){

    var guess = {
        letter: "",
        allLetterGuesses: [],
        correctLetterGuesses: [],
        incorrectLetterGuesses: []
    };

    return guess;
});

app.controller("WordCtrl", ["$scope", "Word", "Guess", function ($scope, Word, Guess){

    $scope.word = Word;
    $scope.guess = Guess;

    $scope.letters = angular.element($scope.word);

    $scope.flipLetter = null;

    $scope.isWordMatch;
    $scope.isLetterMatch = null; 

    $scope.$watchCollection('guess', function() {

        if($scope.guess.letter == ""){
           return;
        } else {
            Guess.allLetterGuesses.push($scope.guess.letter);
            angular.forEach($scope.letters, function(key, index){
                if(key == $scope.guess.letter){
                    Guess.correctLetterGuesses[index] = $scope.guess.letter;
                    $scope.isLetterMatch = true;
                    $scope.flipLetter = true;
                    return;
                } 
            });

            // Only push incorrect letter guesses
            //console.log($scope.letters);
            //console.log(Guess.incorrectLetterGuesses);

            isWordMatch = _.isEqual(Guess.correctLetterGuesses, $scope.word);
            $scope.isLetterMatch = _.contains($scope.letters, $scope.guess.letter);
        }

        if($scope.isLetterMatch == true){
           alert('letter match!'); 
           $scope.isLetterMatch = true;
           return;
        } else {
           alert('letter not matched!'); 
           $scope.isLetterMatch = false;
           return;
        }

        if(isWordMatch == true){
            alert('matched!')
            return;
        }

    });
}]);

app.controller("GuessCtrl", ["$scope", "Guess", function ($scope, Guess){
    $scope.guess = Guess;
}]);

app.controller("AlphabetCtrl", ["$scope", "Guess", "Alphabet", function ($scope, Guess, Alphabet){
    $scope.alphabet = Alphabet;
    $scope.guess = Guess;
    $scope.char = angular.element($scope.alphabet);
}]);

app.controller("DeadManCtrl", ["$scope", "Guess", function ($scope, Guess){

}]);

app.directive('myDeadmanDirective', ['Guess', function (Guess){
    function link(scope,element,attrs){
        scope.guess = Guess;
        scope.$watchCollection('guess', function() {
            if(scope.guess.letter !== ""){
                scope.damn = !scope.isLetterMatch;
            }
            if(scope.damn == true){
                //animate deadman
                angular.element(element).css('top', '10em');
            }
        });
    }
    return {
        link: link,
        transclude: false
    };
}]);

app.directive('myAlphabetDirective', ['Guess', function (Guess){
    function link(scope,element,attrs){
        scope.guess = Guess;

        scope.$watchCollection('guess', function(){
            if(scope.guess.letter == ' '){
                return;
            } else {
                angular.forEach(scope.char, function(key){
                    if(scope.guess.letter === key){
                        angular.element(element).css('color', 'red');
                        if(scope.guess.allLetterGuesses.length > 25){
                            alert('hanged! game over!');
                        }
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


app.directive('myWordDirective', ['Guess', function(Guess){
    function link(scope, element, attrs) {
        scope.guess = Guess;

        scope.$watchCollection('guess', function(){
            angular.forEach(scope.letter, function(key, index){
                if(scope.guess.letter === key){
                    angular.element(element).addClass('selected');
                    scope.flip = true;
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
