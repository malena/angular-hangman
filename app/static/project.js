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
        letter: null,
        index: 0, 
        match: false,
        counter: 0
    };
    return Guess;
});

app.controller("AppCtrl", ["$scope", "Word", "Guess", function($scope, Word, Guess){
    $scope.word = Word; 
    $scope.guess = Guess;
}]);

app.controller("WordCtrl", ["$scope", "Word", function ($scope, Word, Guess) {
    $scope.word = Word;
}]);

app.controller("GuessCtrl", ["$scope", "Guess", "Word", function ($scope, Guess, Word){

    $scope.word = Word;
    $scope.guess = Guess;
    $scope.letter = Guess.letter;

    $scope.$watchCollection('letter', function() {
        angular.forEach($scope.word, function(key,index){
            if($scope.letter == key){
                Word.letter = key;
                $scope.flip(index);
            }
        });
    });

    $scope.flip = function(index) {
        alert('flip card!' + index);
        console.log($scope);
    };

}]);

app.run(function($rootScope){
   console.log('is this running?')
});