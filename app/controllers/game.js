app.controller("GameCtrl", ["$scope", "$location", "$route", "WordService", "Guess", "Animations", function ($scope, $location, $route, WordService, Guess, Animations){

    $scope.animations = Animations;

    $scope.flipLetter = null;
    $scope.isWordMatch;
    $scope.isLetterMatch = null; 
    $scope.lost = false;

    var wordPromise = WordService.randomWord();

    wordPromise.success(function (word) {
        $scope.word = word.split("");
        $scope.letters = angular.element($scope.word);
    });

    $scope.guess = Guess;

    $scope.refocus = 'element'; 

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
            angular.element(element).hide();
        },
    };

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
            $location.path('/won');
        }
        if($scope.isLetterMatch !== true){
           $scope.isLetterMatch = false;
           Guess.incorrectLetterGuesses.push($scope.guess.letter); 
        }
        if($scope.lost == true){
            $location.path('/lost');
        }

    });
    
}]);