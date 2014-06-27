app.directive('myGuessDirective', ['Guess', '$timeout', function(Guess, $timeout){

    function link(scope, element, attrs) {

        scope.$watchCollection('guess', function() {
            if(scope.guess.letter == ""){
                return;
            } else {
                $timeout(function(){
                    scope.guess.letter = "";
                }, 1500);
            }
    	});
    }
    return {
        link: link,
        scope: false,
        transclude: false
    };
}]);
