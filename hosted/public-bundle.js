"use strict";

var MovieList = function MovieList(props) {
  if (props.movies.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "movieList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyMovies"
    }, "No Movies Yet"));
  }

  var movieNodes = props.movies.map(function (movie) {
    console.log("movie nodes");
    return /*#__PURE__*/React.createElement("div", {
      key: movie._id,
      className: "movie"
    }, /*#__PURE__*/React.createElement("section", {
      className: "movie-data"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "title"
    }, /*#__PURE__*/React.createElement("em", null, movie.title)), /*#__PURE__*/React.createElement("h4", {
      className: "movie-plot-header"
    }, "Plot:"), /*#__PURE__*/React.createElement("p", {
      className: "plot"
    }, movie.plot), /*#__PURE__*/React.createElement("section", {
      id: "reviews"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "movie-review-header"
    }, "Reviews:"), /*#__PURE__*/React.createElement("div", {
      className: "rating-results"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "reviewer"
    }, movie.review.reviewerName), /*#__PURE__*/React.createElement("p", {
      className: "rating"
    }, "Rating: ", movie.review.rating, " stars"), /*#__PURE__*/React.createElement("p", {
      className: "review"
    }, movie.review.review))), /*#__PURE__*/React.createElement("h3", {
      className: "trailer"
    }, /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      href: movie.trailer
    }, "Trailer"))));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "movieList"
  }, movieNodes);
};

var loadMoviesFromServer = function loadMoviesFromServer() {
  sendAjax('GET', '/allMovies', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
      movies: data.movies
    }), document.querySelector("#movies"));
  });
};

var setup = function setup() {
  ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
    movies: []
  }), document.querySelector("#movies"));
  loadMoviesFromServer();
};

$(document).ready(function () {
  setup();
});
"use strict";

var handleError = function handleError(message) {
  $("#movieMessage").css('visibility', 'visible');
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  $("#movieMessage").css('visibility', 'hidden');
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
