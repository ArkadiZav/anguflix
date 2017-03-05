app.controller('anguflixCtrl', ['$scope','anguflixService', function($scope, anguflixService) {
  // window.a = $scope;  /* Track variables in the console */
  /* separate my movie collection from store collection */

  // ############### objects #####################
  $scope.movieCollection = anguflixService.movieCollection;
  $scope.myMovieCollection = anguflixService.myMovieCollection;
  $scope.isTrashClicked = anguflixService.isTrashClicked;
  $scope.isUserProfileClicked = anguflixService.isUserProfileClicked;
  $scope.isAdminClicked = anguflixService.isAdminClicked
  $scope.budget = anguflixService.budget;
// ################ functions ########################
  $scope.addMovie = anguflixService.addMovie;
  $scope.removeMovie = anguflixService.removeMovie;
  $scope.showRemoveOption = anguflixService.showRemoveOption;
  $scope.showProfile = anguflixService.showProfile;
  $scope.addToBudget = anguflixService.addToBudget;
  $scope.resetMyProfile = anguflixService.resetMyProfile;
  $scope.showAdmin = anguflixService.showAdmin;
  $scope.showModal = anguflixService.showModal;
  $scope.noWarn = anguflixService.noWarn;
  // ########## HTTP IMDB ############## ///
  $scope.fetch = anguflixService.fetch;
}]);
