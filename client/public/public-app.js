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
    sendAjax('GET', '/allMovies', null, (data) => {
        ReactDOM.render(
            <MovieList movies = {data.movies} />, document.querySelector("#movies")
        );
    });
}
const setup = function() {
    ReactDOM.render(
        <MovieList movies = {[]} />, document.querySelector("#movies")
    );
    loadMoviesFromServer();
}
$(document).ready(function() {
    setup();
})
