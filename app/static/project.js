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
        letter: "?",
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


    var isMatch;

    $scope.$watchCollection('guess', function() {

        if($scope.guess.letter == ""){
           return;
        } else {
            Guess.allLetterGuesses.push($scope.guess.letter);
            angular.forEach($scope.letters, function(key, index){
                if(key == $scope.guess.letter){
                    Guess.correctLetterGuesses[index] = $scope.guess.letter;
                    return;
                }
            });

            // Only push incorrect letter guesses
            Guess.incorrectLetterGuesses.push($scope.guess.letter);

            isMatch = _.isEqual(Guess.correctLetterGuesses, $scope.word);
        }
        if(isMatch == true){
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

app.controller("DeadManCtrl", ["$scope", function ($scope){

}]);

app.directive('myDeadmanDirective', ['Guess', function (Guess){
    function link(scope,element,attrs){
        scope.guess = Guess;

        var body_part = angular.element(element).context.children;

        scope.$watchCollection('guess', function(){
            var count = scope.guess.incorrectLetterGuesses.length-1;
            //angular.element(body_part[count-1]).show();
        });
    }
    return {
        link: link,
        scope: false,
        transclude: false
    };
}]);

app.directive('myAlphabetDirective', ['Guess', function (Guess){
    function link(scope,element,attrs){
        scope.guess = Guess;

        scope.$watchCollection('guess', function(){
            if(scope.guess.letter == ''){
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
