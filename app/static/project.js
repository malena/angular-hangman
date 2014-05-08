var app = angular.module("hangman", []);

app.factory("Alphabet", function(){
    var alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
    ];

    return alphabet;
});

app.factory("Animations", function(){
    return {
        firstAnimation: function(){
           alert('First Animation');
        },
        secondAnimation: function(){
           alert('Second Animation'); 
        }
    }
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

app.controller("WordCtrl", ["$scope", "Word", "Guess", "Animations", function ($scope, Word, Guess, Animations){

    $scope.word = Word;
    $scope.guess = Guess;
    $scope.animations = Animations;

    $scope.matchingState = {
        isLetterMatch: function (letter, word){
            var result = _.contains(letter, word);
            return result;
        },
        isWordMatch: function (word_guess, word){
            var result = _.isEqual(word_guess, word);
            return result;
        }
    };

    $scope.deadState = {
        phase1 : function(element){
            alert('call aniamtion 1');
        } 
    }


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


            $scope.matchingState.isLetterMatch($scope.guess.letter, $scope.letters);
            $scope.matchingState.isWordMatch(Guess.correctLetterGuesses, $scope.word);
        }

        if($scope.isLetterMatch == true){
           alert('match');
        } else {
           $scope.isLetterMatch = false;
           alert('no match');
           $scope.deadState.phase1();
        }
        if($scope.isWordMatch == true){
            alert('matched!')
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
            if(scope.guess.letter == ""){
                return;
            } else {
                console.log(scope.guess.letter);
                console.log($scope);
                var element = angular.element(element);
                scope.firstAnimation();
            }
        });

        scope.firstAnimation = function (){
        }
    }
    return {
        scope: false,
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
