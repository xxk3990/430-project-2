const handleAddReview = (e) => {
    e.preventDefault();
     if ($("#newReview").val() == '' ||
        $("#newReviewer").val() == '' ||
        $("#newReviewRating").val() == '') {
 
        handleError('Cut! All fields are required.');
        return false;
     }
     sendAjax('POST', $("#addReviewForm").attr('action'), $("#addReviewForm").serialize(), function () {
         loadReviewsFromServer();
     });
     return false;
 }
// const handleSearchReview = (e) => {
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

const ReviewForm = (props) => {
    return (
        <form id = "addReviewForm"
        onSubmit = {handleAddReview}
        name="addReviewForm"
        action="/addReview-signedIn" //form only exists on signed in version
        method="POST"
        className="addReviewForm">
        <h3 className ="addReviewHeader">Add review</h3>
        <span>
            <label htmlFor = "title">Title: </label>
            <input id="movieTitle" type="text" name="title" placeholder="Movie title" />
        </span>
        <span>
            <label htmlFor = "review">Review: </label>
            <textarea id="newReview" name="review"/>
        </span>
        <span>
            <label htmlFor = "reviewerName">Your Name: </label>
            <input id="newReviewer" type="text" name="reviewerName" placeholder="your name" />
        </span>
        <span>
            <label htmlFor = "rating">Rating (out of 5 stars): </label>
                <select id='newReviewRating' name = "rating">
                    <option value='0'>0 stars </option>
                    <option value='0.5'>0.5 stars </option>
                    <option value='1'>1 star </option>
                    <option value='1.5'>1.5 stars </option>
                    <option value='2'>2 stars </option>
                    <option value='2.5'>2.5 stars </option>
                    <option value='3'>3 stars </option>
                    <option value='3.5'>3.5 stars </option>
                    <option value='4'>4 stars </option>
                    <option value='4.5'>4.5 stars </option>
                    <option value='5'>5 stars </option>
                </select>
        </span>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="addReviewSubmit" type="submit" value="Add Review" />
        </form>
    )
}
// const ReviewSearch = () => {
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

const ReviewList = function(props) { //reviews will be separate section
if(props.reviews.length === 0) {
    return (
        <div className="reviewList">
            <h3 className = "emptyReviews">No Reviews Yet</h3>
        </div>
    );
}
const reviewNodes = props.reviews.map(function (rev) {
    return (
        <div key={rev._id} className = "ratingReviews">
            <h3 className="title"><em>{rev.title}</em></h3>
            <h5 className = 'reviewerName'>{rev.review.reviewerName}</h5>
            <p className = "rating">Rating: {rev.review.rating} stars</p>
            <p className="review">{rev.review.review}</p>
        </div>
    )
});
    return (
        <div className="reviewList">
            {reviewNodes}
        </div>
    )
}
const InvisibleReviewsForm = (props) => {
    return (
    <form id="profileForm"
        name="profileForm"
        className="profileForm">
        <input type="hidden" name="_csrf" value={props.csrf} />
        </form>
    );
};
const loadReviewsFromServer = () => {
    sendAjax('GET', '/allReviews', null, (data) => {
        ReactDOM.render(
            <ReviewList reviews = {data.reviews} />, document.querySelector("#review-section")
        );
    });
}
// const loadReviewsFromSearch = () => {
//     sendAjax('GET', '/searchReviews', null, (data) => {
//         ReactDOM.render(
//             <SearchReviewList reviews = {data.reviews} />, document.querySelector("#review-section")
//         );
//     });
// }
const setupReviews = (csrf) => {
    ReactDOM.render(
        <ReviewForm csrf={csrf} />, document.querySelector("#addReview")
    );
    ReactDOM.render(
        <ReviewList reviews = {[]} />, document.querySelector("#review-section")
    );
    // ReactDOM.render (
    //     <ReviewSearch csrf = {csrf}/>, document.querySelector("#search-reviews")
    // )
    ReactDOM.render(
        <InvisibleReviewsForm csrf={csrf} />, document.querySelector("#invisibleReviewsForm")
    );
    loadReviewsFromServer();
}
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setupReviews(result.csrfToken);
    })
}
$(document).ready(function() {
    getToken();
})  