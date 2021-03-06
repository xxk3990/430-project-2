const handlePWChange = (e) => {
    e.preventDefault();
    if($("#oldPW").val() == $("newPW").val() || $("#oldPW").val() == $("newPW2").val()) {
        handleError('Cut! Please enter a PW different than the old one.');
        return false;
    }
    if($("#newPW").val() !== $("#newPW2").val()) {
        handleError('Cut! New passwords do not match.');
        return false;
    }
    if($("#user").val() == '' || $("#oldPW").val() == '' || $("#newPW").val() == '') {
        handleError('Cut! Please enter data in all fields.');
        return false;
    }
    sendAjax('POST', $("#newPWForm").attr('action'), $("#newPWForm").serialize(), redirect);
    return false;
    
};


const UserMovieList = function(props) {
    if(props.movies.length === 0) {
        return (
            <div className="userMovieList">
                <h3 className = "emptyMovies">No Movies Yet</h3>
            </div>
        );
    }
    const movieNodes = props.movies.map(function(movie) {
        return (
            <div key={movie._id} className='movie'>
                <section className = "movie-data">   
                    <h3 className="title"><em>{movie.title}</em></h3>
                    <h4 className="movie-plot-header">Plot:</h4>
                    <p className="plot">{movie.plot}</p>
                    <h3 className="trailer"><a target="_blank"
                    href={movie.trailer}>Trailer</a></h3>
                </section> 
            </div>
        )
    });
    return(
        <div className="userMovieList">
            {movieNodes}
        </div>
    );
}
const UserReviewList = function(props) { //TURN REVIEWS INTO SEPARATE SECTION!
        if(props.reviews.length === 0) {
            return (
                <div className="userMovieList">
                    <h3 className = "emptyMovies">No Reviews Yet</h3>
                </div>
            );
        }
        const reviewNodes = props.reviews.map(function(rev) {
            return (
                    <div key={rev._id} className = "ratingReviews">
                        <h3 className="title"><em>{rev.title}</em></h3>
                        <p className = "rating">Rating: {rev.review.rating} stars</p>
                        <p className="review">{rev.review.review}</p>
                    </div>
                )
        });
        return(
            <div className="userMovieList">
                {reviewNodes}
            </div>
        );
    }

const InvisibleProfileForm = (props) => {
    return (
    <form id="profileForm"
        name="profileForm"
        className="profileForm">
        <input type="hidden" name="_csrf" value={props.csrf} />
        </form>
    );
};

const ChangePWForm = (props) => {
    return (
        <form id = "newPWForm"
        name = "newPWForm"
        onSubmit = {handlePWChange}
        method = 'POST'
        action = '/newPW'
        className = "newPWForm">
            <label htmlFor = "username">To make sure it's you, please enter the username associated with this account.</label><br/>
            <input id ="user" type="text" name="username" placeholder="username" />
            <label htmlFor = "pass">Please enter your old (current) password.</label>
            <input id ="oldPW" type="password" name="pass" placeholder="old/current password" />
            <label htmlFor = "newPW">Please enter your new password.</label>
            <input id ="newPW" type="password" name="newPW" placeholder="new password" />
            <label htmlFor = "newPW2">Please re-enter your new password.</label>
            <input id ="newPW2" type="password" name="newPW2" placeholder="re-enter new password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="newPWformSubmit" type="submit" value="Submit new password" />
        </form>
    )
}
    
   

const loadMoviesFromServer = () => {
    sendAjax('GET', '/getByUser', null, (data) => {
        ReactDOM.render(
            <UserMovieList movies = {data.movies} />, document.querySelector("#moviesByUser")
        );
    });
}
const loadReviewsFromServer = () => {
    sendAjax('GET', '/reviewsByUser', null, (data) => {
        ReactDOM.render(
            <UserReviewList reviews = {data.reviews} />, document.querySelector("#reviewsByUser")
        );
    });
}

const setup = function(csrf) {
    ReactDOM.render(
        <UserMovieList movies = {[]}/>, document.querySelector("#moviesByUser")
    );
    ReactDOM.render(
        <InvisibleProfileForm csrf={csrf} />, document.querySelector("#invisibleProfileForm")
    );
    ReactDOM.render(
        <ChangePWForm csrf = {csrf}/>, document.querySelector("#changePW-form")
    );
    loadMoviesFromServer();
    loadReviewsFromServer();
}
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    })
}
$(document).ready(function() {
    getToken();
})