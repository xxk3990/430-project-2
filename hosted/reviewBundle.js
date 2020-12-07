"use strict";

var handleAddReview = function handleAddReview(e) {
  e.preventDefault();

  if ($("#newReview").val() == '' || $("#newReviewer").val() == '' || $("#newReviewRating").val() == '') {
    handleError('Cut! All fields are required.');
    return false;
  }

  sendAjax('POST', $("#addReviewForm").attr('action'), $("#addReviewForm").serialize(), function () {
    loadReviewsFromServer();
  });
  return false;
}; // const handleSearchReview = (e) => {
//     e.preventDefault();
//     $("ReviewList").css('display', 'none');
//     $("SearchReviewList").css('display', 'block');
//     const movieTitle = $("#searchReview").val();
//     const xhr = new XMLHttpRequest();
//     xhr.onload = () => {loadReviewsFromSearch};
//     xhr.open('GET', `/searchReviews`);
//     xhr.send(movieTitle);
//     return false;
//  }


var ReviewForm = function ReviewForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "addReviewForm",
    onSubmit: handleAddReview,
    name: "addReviewForm",
    action: "/addReview-signedIn" //form only exists on signed in version
    ,
    method: "POST",
    className: "addReviewForm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "addReviewHeader"
  }, "Add review"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "movieTitle",
    type: "text",
    name: "title",
    placeholder: "Movie title"
  })), /*#__PURE__*/React.createElement("label", {
    className: "warning"
  }, "Please use roman numerals for numbers and colons wherever possible!"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "review"
  }, "Review: "), /*#__PURE__*/React.createElement("textarea", {
    id: "newReview",
    name: "review"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "reviewerName"
  }, "Your Name: "), /*#__PURE__*/React.createElement("input", {
    id: "newReviewer",
    type: "text",
    name: "reviewerName",
    placeholder: "your name"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "rating"
  }, "Rating (out of 5 stars): "), /*#__PURE__*/React.createElement("select", {
    id: "newReviewRating",
    name: "rating"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "0 stars "), /*#__PURE__*/React.createElement("option", {
    value: "0.5"
  }, "0.5 stars "), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "1 star "), /*#__PURE__*/React.createElement("option", {
    value: "1.5"
  }, "1.5 stars "), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "2 stars "), /*#__PURE__*/React.createElement("option", {
    value: "2.5"
  }, "2.5 stars "), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "3 stars "), /*#__PURE__*/React.createElement("option", {
    value: "3.5"
  }, "3.5 stars "), /*#__PURE__*/React.createElement("option", {
    value: "4"
  }, "4 stars "), /*#__PURE__*/React.createElement("option", {
    value: "4.5"
  }, "4.5 stars "), /*#__PURE__*/React.createElement("option", {
    value: "5"
  }, "5 stars "))), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "addReviewSubmit",
    type: "submit",
    value: "Add Review"
  }));
}; // const ReviewSearch = () => {
//     return(
//        <div id = "searchMovieForm">
//             <label htmlFor = "searchTitle">Get reviews for a movie!</label>
//             <input type ="text" id = "searchReview" name = "searchTitle" placeholder ="movie title"/>
//             {/* <input type="hidden" name="_csrf" value = {props.csrf}/> */}
//             <button type="submit" id ="searchReviewSubmit" onClick = {handleSearchReview}>Search!</button>
//        </div>
//     )
// }
// const SearchReviewList = (props) => {
//     if(props.reviews.length === 0) {
//         return (
//             <div className="reviewList">
//                 <h3 className = "emptyReviews">No Results Found.</h3>
//             </div>
//         );
//     }
//     const searchNodes = props.reviews.map(function(rev) {
//         return (
//             <div key={rev._id} className = "ratingReviews">
//                 <h3 className="title"><em>{rev.title}</em></h3>
//                 <h5 className = 'reviewerName'>{rev.review.reviewerName}</h5>
//                 <p className = "rating">Rating: {rev.review.rating} stars</p>
//                 <p className="review">{rev.review.review}</p>
//             </div>
//         )
//     });
//         return (
//             <div className="reviewList">
//                 {searchNodes}
//             </div>
//         )
//     }


var ReviewList = function ReviewList(props) {
  //reviews will be separate section
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

var InvisibleReviewsForm = function InvisibleReviewsForm(props) {
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

var loadReviewsFromServer = function loadReviewsFromServer() {
  sendAjax('GET', '/allReviews', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ReviewList, {
      reviews: data.reviews
    }), document.querySelector("#review-section"));
  });
}; // const loadReviewsFromSearch = () => {
//     sendAjax('GET', '/searchReviews', null, (data) => {
//         ReactDOM.render(
//             <SearchReviewList reviews = {data.reviews} />, document.querySelector("#review-section")
//         );
//     });
// }


var setupReviews = function setupReviews(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ReviewForm, {
    csrf: csrf
  }), document.querySelector("#addReview"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ReviewList, {
    reviews: []
  }), document.querySelector("#review-section")); // ReactDOM.render (
  //     <ReviewSearch csrf = {csrf}/>, document.querySelector("#search-reviews")
  // )

  ReactDOM.render( /*#__PURE__*/React.createElement(InvisibleReviewsForm, {
    csrf: csrf
  }), document.querySelector("#invisibleReviewsForm"));
  loadReviewsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupReviews(result.csrfToken);
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
