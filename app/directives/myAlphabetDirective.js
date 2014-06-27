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
                            var letter = angular.element(element);
                            letter.addClass('incorrect');
                            /*
                            TweenLite.to(letter, 2, {
                                top:'44em',
                                left:'-30em',
                                ease:Power4.easeOut
                                });
                            */

                            var staggerTimeline = new TimelineLite();
                            staggerTimeline.from(letter, 0.2, {opacity:0})
                               .staggerFrom(letter, 0.6, {rotation:"-90deg", ease:Back.easeOut}, 0.1)
                               .to(letter, 1, {opacity:0});
                            staggerTimeline;
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
