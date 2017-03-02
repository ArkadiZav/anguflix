app.controller('anguflixCtrl', ['$scope', function($scope, anguflixService) {
  $scope.movies = anguflixService.movieCollection;
}]);
