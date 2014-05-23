app.controller("DeadManCtrl", ["$scope", "Guess", function ($scope, Guess){
    $scope.guess = Guess;
    $scope.$watchCollection('guess', function() {
         if($scope.guess.letter == ""){
           return;
        } else {
            //
        }
    });
}]);