"use strict";

var handlePWChange = function handlePWChange(e) {
  e.preventDefault();

  if ($("#oldPW").val() == $("newPW").val() || $("#oldPW").val() == $("newPW2").val()) {
    handleError('Cut! Please enter a PW different than the old one.');
    return false;
  }

  if ($("#newPW").val() !== $("#newPW2").val()) {
    handleError('Cut! New passwords do not match.');
    return false;
  }

  if ($("#user").val() == '' || $("#oldPW").val() == '' || $("#newPW").val() == '') {
    handleError('Cut! Please enter data in all fields.');
    return false;
  }

  sendAjax('POST', $("#newPWForm").attr('action'), $("#newPWForm").serialize(), redirect);
  return false;
};

var UserMovieList = function UserMovieList(props) {
  if (props.movies.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "userMovieList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyMovies"
    }, "No Movies Yet"));
  }

  var movieNodes = props.movies.map(function (movie) {
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
    }, " ", /*#__PURE__*/React.createElement("p", {
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
    className: "userMovieList"
  }, movieNodes);
};

var InvisibleProfileForm = function InvisibleProfileForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "profileForm",
    name: "profileForm",
    className: "profileForm"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var ChangePWForm = function ChangePWForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "newPWForm",
    name: "newPWForm",
    onSubmit: handlePWChange,
    method: "POST",
    action: "/newPW",
    className: "newPWForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "To make sure it's you, please enter the username associated with this account."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "oldPW"
  }, "Please enter your old (current) password."), /*#__PURE__*/React.createElement("input", {
    id: "oldPW",
    type: "password",
    name: "oldPW",
    placeholder: "old/current password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPW"
  }, "Please enter your new password."), /*#__PURE__*/React.createElement("input", {
    id: "newPW",
    type: "password",
    name: "newPW",
    placeholder: "new password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPW2"
  }, "Please re-enter your new password."), /*#__PURE__*/React.createElement("input", {
    id: "newPW2",
    type: "password",
    name: "newPW2",
    placeholder: "re-enter new password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "newPWformSubmit",
    type: "submit",
    value: "Submit new password"
  }));
};

var loadMoviesFromServer = function loadMoviesFromServer() {
  sendAjax('GET', '/getByUser', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(UserMovieList, {
      movies: data.movies
    }), document.querySelector("#moviesByUser"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(UserMovieList, {
    movies: []
  }), document.querySelector("#moviesByUser"));
  ReactDOM.render( /*#__PURE__*/React.createElement(InvisibleProfileForm, {
    csrf: csrf
  }), document.querySelector("#invisibleProfileForm"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePWForm, {
    csrf: csrf
  }), document.querySelector("#changePW-form"));
  loadMoviesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
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
