"use strict";

var ReviewList = function ReviewList(props) {
  if (props.reviews.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "reviewList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyReviews"
    }, "No Reviews Yet"));
  }

  var reviewNodes = props.reviews.map(function (rev) {
    return /*#__PURE__*/React.createElement("div", {
      key: rev._id,
      className: "ratingReviews"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "title"
    }, /*#__PURE__*/React.createElement("em", null, rev.title)), /*#__PURE__*/React.createElement("h5", {
      className: "reviewerName"
    }, rev.review.reviewerName), /*#__PURE__*/React.createElement("p", {
      className: "rating"
    }, "Rating: ", rev.review.rating, " stars"), /*#__PURE__*/React.createElement("p", {
      className: "review"
    }, rev.review.review));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "reviewList"
  }, reviewNodes);
};

var loadReviewsFromServer = function loadReviewsFromServer() {
  sendAjax('GET', '/allReviews', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ReviewList, {
      reviews: data.reviews
    }), document.querySelector("#review-section-public"));
  });
};

var setup = function setup() {
  ReactDOM.render( /*#__PURE__*/React.createElement(ReviewList, {
    reviews: []
  }), document.querySelector("#review-section-public"));
  loadReviewsFromServer();
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
