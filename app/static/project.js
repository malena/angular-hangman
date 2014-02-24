$(function() {
	$('input.guess').focus();
});

var app = angular.module("hanglady", []);

app.factory("Words", function(){
    var Words = ["hello", "bye", "sock", "orange"];
	return Words;
});

app.controller("WordCtrl", ["$scope", "Words", function ($scope, Words) {

	$scope.words = Words;

    $scope.randomWord = getRandomWord($scope.words);

    $scope.splitArray = splitStringIntoArray($scope.randomWord);

    console.log($scope.splitArray);

    // TODOF: These are general functions that can be re-used

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

    function splitStringIntoArray(string){
       return string.split("");
    }


}]);

app.run(function($rootScope){
   console.log('is this running?')
});