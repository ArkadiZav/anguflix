app.factory('anguflixService', function($localStorage, $http) {
  //var movies = [{name: "The Matrix", price: 10, year: "1999", description: "Take the blue pill or the red pill?...", imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/The_Matrix_soundtrack_cover.jpg"},
                //{name: "Undisputed 3", price: 8, year: "2010", description: "Boyka - the most complete fighter in the world", imageUrl: "http://www.popcorntimenow.com/wp-content/uploads/2010/06/undisputed-3-redemption-2010-poster.jpg"},
                //{name: "Shutter Island", price: 7, year: "2010", description: "It's 1954, and up-and-coming U.S. marshal Teddy Daniels is assigned to investigate the disappearance of a patient from Boston's Shutter Island Ashecliffe Hospital.", imageUrl: "http://thepeoplesmovies.files.wordpress.com/2009/10/shutter-island-b.jpg"},
                //{name: "Shawshank Redemption", price: 12, description: "Best movie EVER!", year:"1994", imageUrl: "http://www.shawshankredemption.org/4b.jpg"}, {name: "Kill Bill", price: 9, description: "Quentin Tarantino's finest!", year:"2003", imageUrl: "http://sneakernews.com/wp-content/uploads/2012/10/asics-gel-saga-ii-kill-bill-3.jpg"}];
  var isTrashClicked = {content: false};
  var isUserProfileClicked = {content: false};
  var isAdminClicked = {content: false};
  var showModal = {val: false};

  var saved = localStorage.getItem('myMovies'); // save my movie collection
  var saved2 = localStorage.getItem('budget'); // save budget
  var saved3 = localStorage.getItem('movies'); // save movie store collection

  var myMovies = (localStorage.getItem('myMovies') !== null) ? JSON.parse(saved) : [];
  var movies = (localStorage.getItem('movies') !== null) ? JSON.parse(saved3) : [{name: "The Matrix", price: 10, year: "1999", description: "Take the blue pill or the red pill?...", imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/The_Matrix_soundtrack_cover.jpg"},
                {name: "Undisputed 3", price: 8, year: "2010", description: "Boyka - the most complete fighter in the world", imageUrl: "http://www.popcorntimenow.com/wp-content/uploads/2010/06/undisputed-3-redemption-2010-poster.jpg"},
                {name: "Shutter Island", price: 7, year: "2010", description: "It's 1954, and up-and-coming U.S. marshal Teddy Daniels is assigned to investigate the disappearance of a patient from Boston's Shutter Island Ashecliffe Hospital.", imageUrl: "http://thepeoplesmovies.files.wordpress.com/2009/10/shutter-island-b.jpg"},
                {name: "Shawshank Redemption", price: 12, description: "Best movie EVER!", year:"1994", imageUrl: "http://www.shawshankredemption.org/4b.jpg"}, {name: "Kill Bill", price: 9, description: "Quentin Tarantino's finest!", year:"2003", imageUrl: "http://sneakernews.com/wp-content/uploads/2012/10/asics-gel-saga-ii-kill-bill-3.jpg"}];;


  if (saved2 == "null") {
    var budget = {current: 35};
  }
  else {
    var budget = JSON.parse(saved2);
  }

  localStorage.setItem('myMovies', JSON.stringify(myMovies));
  localStorage.setItem('budget', JSON.stringify(budget));
  localStorage.setItem('movies', JSON.stringify(movies));



  addMovie = function(movie) {
    var sameMovie = false;
    angular.forEach(myMovies, function(item) {
      if (item.name === movie.name) {
        sameMovie = true;
        return;
      }
    });
    if (!sameMovie) {
      if (budget.current < movie.price) {
        showModal.val = true;
      }
      else {
        showModal.val = false;
        budget.current -= movie.price;
        myMovies.push(movie);
        localStorage.setItem('budget', JSON.stringify(budget));
        localStorage.setItem('myMovies', JSON.stringify(myMovies));
      }
    }
  };

  removeMovie = function($index) {
    budget.current += myMovies[$index].price;
    myMovies.splice($index, 1);
    localStorage.setItem('budget', JSON.stringify(budget));
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
  };

  showRemoveOption = function() {
    if (isTrashClicked.content) {
      isTrashClicked.content = false;
    }
    else {
      isTrashClicked.content = true;
    }
  }

  showProfile = function() {
    if (isUserProfileClicked.content) {
      isUserProfileClicked.content = false;
    }
    else {
      isUserProfileClicked.content = true;
    }
  }

  showAdmin = function() {
    if (isAdminClicked.content) {
      isAdminClicked.content = false;
    }
    else {
      isAdminClicked.content = true;
    }
  }

  addToBudget = function(moneyToAdd) {
    budget.current += moneyToAdd;
    localStorage.setItem('budget', JSON.stringify(budget));
  }

  resetMyProfile = function () {
    myMovies = [];
    budget.current = 35;
    movies = [{name: "The Matrix", price: 10, year: "1999", description: "Take the blue pill or the red pill?...", imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/The_Matrix_soundtrack_cover.jpg"},
                  {name: "Undisputed 3", price: 8, year: "2010", description: "Boyka - the most complete fighter in the world", imageUrl: "http://www.popcorntimenow.com/wp-content/uploads/2010/06/undisputed-3-redemption-2010-poster.jpg"},
                  {name: "Shutter Island", price: 7, year: "2010", description: "It's 1954, and up-and-coming U.S. marshal Teddy Daniels is assigned to investigate the disappearance of a patient from Boston's Shutter Island Ashecliffe Hospital.", imageUrl: "http://thepeoplesmovies.files.wordpress.com/2009/10/shutter-island-b.jpg"},
                  {name: "Shawshank Redemption", price: 12, description: "Best movie EVER!", year:"1994", imageUrl: "http://www.shawshankredemption.org/4b.jpg"}, {name: "Kill Bill", price: 9, description: "Quentin Tarantino's finest!", year:"2003", imageUrl: "http://sneakernews.com/wp-content/uploads/2012/10/asics-gel-saga-ii-kill-bill-3.jpg"}];;

    localStorage.setItem('budget', JSON.stringify(budget));
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  noWarn = function () {
    showModal.val = false;
  }

  fetch = function(movieName) {
    $http.get("https://www.omdbapi.com/?t=" + movieName)
      .then(function(response) {
        var title = response.data.Title;
        var year = response.data.Year;
        var description = response.data.Plot;
        var image = response.data.Poster;
        var price = Math.floor(Math.random() * 10) + 1  // random price between 1 - 10 : because no price is in the API
        var movie = {name: title, price: price, year: year, description: description, imageUrl: image};
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
      });
  }

  return {
    movieCollection: movies,
    myMovieCollection: myMovies,
    isTrashClicked: isTrashClicked,
    isUserProfileClicked: isUserProfileClicked,
    isAdminClicked: isAdminClicked,
    addToBudget: addToBudget,
    resetMyProfile: resetMyProfile,
    budget: budget,
    addMovie: addMovie,
    removeMovie: removeMovie,
    showRemoveOption: showRemoveOption,
    showProfile: showProfile,
    showAdmin: showAdmin,
    noWarn: noWarn,
    fetch: fetch,
    showModal: showModal
  };
});
