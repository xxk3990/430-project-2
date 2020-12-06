const handleMovie = (e) => {
    e.preventDefault();
    $("#movieMessage").css('visibility', 'visible');
    if ($("#movieTitle").val() == '' || $("#moviePlot").val() == '' || $("#movieReview").val() == ''
         || $("#movieReviewer").val() == '' || $("#movieRating").val() == '' || $("#movieTrailer").val() == '') {
        handleError('Cut! All fields are required.');
        return false;
    }
    sendAjax('POST', $("#movieForm").attr('action'), $("#movieForm").serialize(), function () {
        loadMoviesFromServer();
    });
    return false;
}
const MovieForm = (props) => {
    return(
        <form id = "movieForm"
            onSubmit = {handleMovie}
            name="movieForm"
            action="/adder"
            method="POST"
            className="movieForm">
                <span>
                    <label htmlFor = "title">Title: </label>
                    <input id="movieTitle" type="text" name="title" placeholder="Movie title" />
                </span>
                <span>
                    <label htmlFor = "plot">Plot </label>
                    <textarea id="moviePlot" name="plot" placeholder="movie plot"/>
                </span>
                <span>
                    <label htmlFor = "review">Review: </label>
                    <textarea id="movieReview" name="review"/>
                </span>
                 <span>
                    <label htmlFor = "reviewerName">Your Name: </label>
                    <input id="movieReviewer" type="text" name="reviewerName" placeholder="your name" />
                </span>
                <span>
                    <label htmlFor = "rating">Rating (out of 5 stars): </label>
                    <select id='movieRating' name = "rating">
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
                <span>
                    <label htmlFor = "trailer">Trailer: </label>
                    <input id="movieTrailer" type="url" name="trailer" placeholder="Movie Trailer" />
                </span>
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="makeMovieSubmit" type="submit" value="Add Movie" />
            </form>
    )
}
const MovieList = function(props) {
    if(props.movies.length === 0) {
        return (
            <div className="movieList">
                <h3 className = "emptyMovies">No Movies Yet</h3>
            </div>
        );
    }
    const movieNodes = props.movies.map(function(movie) {
        console.log("movie nodes");
        return (
            <div key={movie._id} className='movie'>
                <section className = "movie-data">   
                    <h3 className="title"><em>{movie.title}</em></h3>
                    <h4 className="movie-plot-header">Plot:</h4>
                    <p className="plot">{movie.plot}</p>
                    <section id="reviews">
                        <h4 className="movie-review-header">Reviews:</h4>
                        <div className="rating-results">
                            <h5 className = 'reviewer'>{movie.review.reviewerName}</h5>
                            <p className = "rating">Rating: {movie.review.rating} stars</p>
                            <p className="review">{movie.review.review}</p>
                        </div> 
                    </section>
                    <h3 className="trailer"><a target="_blank"
                    href={movie.trailer}>Trailer</a></h3>
                </section> 
            </div>
        )
    });
    return(
        <div className="movieList">
            {movieNodes}
        </div>
    );
}
const loadMoviesFromServer = () => {
    $("#movieMessage").css('visibility', 'hidden');
    sendAjax('GET', '/allMovies', null, (data) => {
        ReactDOM.render(
            <MovieList movies = {data.movies} />, document.querySelector("#movies")
        );
    });
}

const setup = function(csrf) {
    ReactDOM.render(
        <MovieForm csrf={csrf} />, document.querySelector("#addMovie")
    );
    ReactDOM.render(
        <MovieList movies = {[]} />, document.querySelector("#movies")
    );
    loadMoviesFromServer();
}
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    })
}
$(document).ready(function() {
    getToken();
})
