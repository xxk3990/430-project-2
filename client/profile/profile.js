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
                    <section id="reviews">
                        <h4 className="movie-review-header">Reviews:</h4>
                        <div className="rating-results">
                            <h5 className = 'reviewer'>{movie.review.reviewer}</h5>
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
        <div className="userMovieList">
            {movieNodes}
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
    
   

const loadMoviesFromServer = () => {
    sendAjax('GET', '/getByUser', null, (data) => {
        ReactDOM.render(
            <UserMovieList movies = {data.movies} />, document.querySelector("#moviesByUser")
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