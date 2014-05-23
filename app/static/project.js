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
        },
        thirdAnimation: function(){
           alert('Third Animation'); 
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
            angular.element(element).show();
        },
        phase2: function(element){
            angular.element(element).css('top','5em');
        },
        phase3: function(element){
            angular.element(element).css('top','20em');
        },
        phase4: function(element){
            $('body').removeClass('inverse');
            angular.element(element).hide();
        },

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


            $scope.isWordMatch = _.isEqual(Guess.correctLetterGuesses, $scope.word);
            $scope.isLetterMatch = _.contains($scope.letters, $scope.guess.letter);
        }

        if($scope.isWordMatch == true){
            alert('Wahoo! You haven\'t gone mad!!');
            return;
        }
        if($scope.isLetterMatch !== true){
           $scope.isLetterMatch = false;
           Guess.incorrectLetterGuesses.push($scope.guess.letter); 
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
    $scope.guess = Guess;
    $scope.$watchCollection('guess', function() {
         if($scope.guess.letter == ""){
           return;
        } else {
            //
        }
    });

}]);

app.directive('myDeadmanDirective', ['Guess', function (Guess){
    function link(scope,element,attrs){
        scope.deadman = angular.element(element).children('.deadman');
        scope.guess = Guess;
        scope.$watchCollection('guess', function() {

            if(scope.guess.letter !== ""){
                if(scope.isLetterMatch == false){
                    if(scope.guess.incorrectLetterGuesses.length == 1){
                        scope.deadState.phase1(scope.deadman);
                    } else if(scope.guess.incorrectLetterGuesses.length == 2){
                       scope.deadState.phase2(scope.deadman);
                    } else if(scope.guess.incorrectLetterGuesses.length == 3){
                       scope.deadState.phase3(scope.deadman);
                    } else if(scope.guess.incorrectLetterGuesses.length == 4){
                       scope.deadState.phase4(scope.deadman);
                       alert('you don\'t have what it takes!');
                    }
                }
            }
        });
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
                        if(scope.isLetterMatch == true){
                            angular.element(element).addClass('correct');
                        } else {
                            angular.element(element).addClass('incorrect');
                        }
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
