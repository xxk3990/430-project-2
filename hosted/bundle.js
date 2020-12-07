"use strict";

var handleMovie = function handleMovie(e) {
  e.preventDefault();
  $("#movieMessage").css('visibility', 'visible');

  if ($("#movieTitle").val() == '' || $("#moviePlot").val() == '' || $("#movieReview").val() == '' || $("#movieReviewer").val() == '' || $("#movieRating").val() == '' || $("#movieTrailer").val() == '') {
    handleError('Cut! All fields are required.');
    return false;
  }

  sendAjax('POST', $("#movieForm").attr('action'), $("#movieForm").serialize(), function () {
    loadMoviesFromServer();
  });
  return false;
};

var MovieForm = function MovieForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "movieForm",
    onSubmit: handleMovie,
    name: "movieForm",
    action: "/adder_signedIn",
    method: "POST",
    className: "movieForm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "addMovieHeader"
  }, "Add a plot and trailer for a movie!"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "movieTitle",
    type: "text",
    name: "title",
    placeholder: "Movie title"
  })), /*#__PURE__*/React.createElement("label", {
    className: "warning"
  }, "Please use roman numerals for numbers and colons wherever possible!"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "plot"
  }, "Plot: "), /*#__PURE__*/React.createElement("textarea", {
    id: "moviePlot",
    name: "plot",
    placeholder: "movie plot"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "trailer"
  }, "Trailer: "), /*#__PURE__*/React.createElement("input", {
    id: "movieTrailer",
    type: "url",
    name: "trailer",
    placeholder: "Movie Trailer"
  })), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeMovieSubmit",
    type: "submit",
    value: "Add Movie"
  }));
};

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
    }, movie.plot), /*#__PURE__*/React.createElement("h3", {
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
  $("#movieMessage").css('visibility', 'hidden');
  sendAjax('GET', '/allMovies', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
      movies: data.movies
    }), document.querySelector("#movies"));
  });
};

var setupMovies = function setupMovies(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(MovieForm, {
    csrf: csrf
  }), document.querySelector("#addMovie"));
  ReactDOM.render( /*#__PURE__*/React.createElement(MovieList, {
    movies: []
  }), document.querySelector("#movies"));
  loadMoviesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupMovies(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
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
