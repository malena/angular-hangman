var app = angular.module("App", ['ngMockE2E', 'ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/',
        {
            templateUrl: 'home.html'
        })
        .when('/lost',
        {
            templateUrl: 'lost.html'
        })
        .when('/won',
        {
            templateUrl: 'won.html'
        }
    )
});

