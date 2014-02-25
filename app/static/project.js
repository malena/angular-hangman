$(function() {
	$('input.guess').focus();
});

var app = angular.module("hanglady", []);

app.factory("Word", function(){

    var Words = ["hello", "bye", "sock", "orange"];
    var Word = getRandomWord(Words);

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

    return Word;

});

app.controller("WordCtrl", ["$scope", "Word", function ($scope, Word) {

    $scope.randomWord = Word;
    $scope.splitArray = splitStringIntoArray($scope.randomWord);

    function splitStringIntoArray(string){
       return string.split("");
    }
    console.log($scope.splitArray);

}]);

app.controller("GuessCtrl", ["$scope", "Word", function($scope, Word){
    console.log("guess ctrl");
}]);

app.run(function($rootScope){
   console.log('is this running?')
});