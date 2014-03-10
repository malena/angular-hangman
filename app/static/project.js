$(function() {
	$('input.guess').focus();
});

var app = angular.module("hanglady", ['ngAnimate']);

app.factory("Word", function(){
    var Words = ["hello", "bye", "sock", "orange"];
    var stringWord = getRandomWord(Words);
    var Word = makeArray(stringWord);

    function getRandomWord (list) {
        var random_index = getRandomIndex(list);
        if (list[random_index] === undefined){
            return list[0];
        } else {
            return list[random_index];
        }
    }
    function getRandomIndex(list){
        var random = Math.round(Math.random() * (list.length) + 0);
        return random;
    }

    function makeArray(stringWord){
       return stringWord.split("");
    }

    return Word;
});

app.factory("Guess", function(){
    var Guess = {
        letter: 'm'
    };
    return Guess;
});

app.controller("AppCtrl", ["$rootScope", "$scope", "Word", "Guess", function($rootScope, $scope, Word, Guess){
    $scope.word = Word; 
    $scope.guess = Guess;

    $scope.flip = function(index) {
        alert('flip');
        $rootScope.match = true;
    };

}]);

app.controller("WordCtrl", ["$rootScope", "$scope", "Word", function ($rootScope, $scope, Word, Guess) {
}]);

app.controller("GuessCtrl", ["$scope", "Guess", "Word", function ($scope, Guess, Word){

    $scope.$watchCollection('guessLetter', function() {
        angular.forEach($scope.word, function(key,index){
            if($scope.guessLetter == key){
                $scope.flip(index);
            }
        });
    });

}]);

app.run(function($rootScope){
    $rootScope.match = false;
});