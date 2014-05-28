var wordFetcherAppTest = angular.module('wordFetcherAppTest', ['app', 'ngMockE2E']);

app.run(function($httpBackend) {
    var testWords = [ 'Malena', 'Boa', 'Cat', 'Dog', 'Elephant', 'Fox', 'Groundhog', 'Hippopotamus', 'Iguana' ];
    var randomWord = testWords[Math.floor(Math.random() * testWords.length)];

    $httpBackend.whenGET(/\.html$/).passThrough();
    $httpBackend.whenGET('/random-word').respond(randomWord);
});
