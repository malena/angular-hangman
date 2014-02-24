$(function() {
	$('input.guess').focus();
});

var app = angular.module("hanglady", []);

app.factory("Words", function(){
	var Words = ["hello", "bye", "sock", "orange"];
	return Words;
});

app.controller("WordCtrl", ["$scope", "Words", function($scope, Words) {

	$scope.words = Words;

	angular.forEach(Words, function(value, key){
		console.log(value);
    });


}]);