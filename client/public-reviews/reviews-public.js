const ReviewList = function(props) {
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
const loadReviewsFromServer = () => {
        sendAjax('GET', '/allReviews', null, (data) => {
            ReactDOM.render(
                <ReviewList reviews = {data.reviews} />, document.querySelector("#review-section-public")
            );
        });
}
const setup = function() {
    ReactDOM.render(
        <ReviewList reviews = {[]} />, document.querySelector("#review-section-public")
    );
    loadReviewsFromServer();
}
$(document).ready(function() {
    setup();
})