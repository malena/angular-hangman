var app = angular.module("hanglady", []);

app.factory("WordPicker", function(){

    var words = [ 
        "happy",
        "sad",
        "hungry",
        "thirsty"
    ]; 

    function pickRandomItem (list) {

        function randomIndexGenerator (){
            var random = Math.round(Math.random() * (list.length) + 0);

            if(random == words.length){
               return random - 1; 
            }
            return random;
        };

        if (list[randomIndexGenerator()] === undefined){
            return list[0];
        } 

        return list[randomIndexGenerator()];
    }

    var random_word = pickRandomItem(words);

    return random_word;
});

app.factory("Guess", function(){
    var guess = {
        letter: "?",
        allLetterGuesses: [],
        correctLetterGuesses: []
    };
    return guess;
});

app.controller("MainCtrl", ["$scope", "WordPicker", function($scope, WordPicker){
    $scope.word = WordPicker;
    $scope.letters = angular.element($scope.word.split(""));

    /*
    $scope.checkWordComplete = function (letter){
        alert('flip letter' + letter);
        console.log(angular.element($scope.letters));
    };
    */

}]);

app.controller("WordCtrl", ["$scope", function ($scope){
}]);

app.controller("GuessCtrl", ["$scope", "Guess", function ($scope, Guess){

    $scope.guess = Guess;

    $scope.$watchCollection('guess', function() {

        if(!$scope.guess || $scope.guess.letter === "" ){
            return false;
        } else {
            angular.forEach($scope.letters, function(key, index){
                if($scope.guess.letter === key){
                    Guess.correctLetterGuesses.push($scope.guess.letter);
                    // $scope.checkWordComplete($scope.guess.letter);
                    return true;
                }
            });
        }

        Guess.allLetterGuesses.push($scope.guess.letter);
    });

}]);

app.directive('myRepeatDirective', ['Guess', function(Guess){

    function link(scope, element, attrs) {
        //console.log(angular.element(element).scope().letter);
        scope.guess = Guess;

        scope.$watchCollection('guess', function() {

            if(scope.letter === "" || scope.letter == "?"){
                return false;
            } else {
                angular.forEach(scope.letter, function(key, index){
                    if(scope.guess.letter === key){
                        // $scope.checkWordComplete($scope.guess.letter);
                        console.log('true');
                        console.log(scope);
                        angular.element(element).css('border', '5px solid red');
                        return true;
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

app.directive('myMainDirective', function() {

    function link(scope, element, attr){
        //angular.element(element).css('border','5px solid red');
        //console.log(scope);
    }

    return {
        link: link
    };
});