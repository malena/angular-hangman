app.directive('myDeadmanDirective', ['Guess','$location', function (Guess, $location){
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
                       //TODO make a change to root $scope.lost == true
                       // so that you cannot go back with delete key
                       $location.path('/lost');
                    }
                }
                else {
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
