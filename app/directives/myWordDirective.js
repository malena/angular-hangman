app.directive('myWordDirective', ['Guess', function(Guess){

    function link(scope, element, attrs) {
        scope.guess = Guess;

        var flipCard = function() {
            element.addClass('flipped');
        }

        scope.$watchCollection('guess', function(){
            angular.forEach(scope.letter, function(key, index){
                if(scope.guess.letter === key){
                    angular.element(element).addClass('selected');
                    scope.flip = true;
                    flipCard();
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
