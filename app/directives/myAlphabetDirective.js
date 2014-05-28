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