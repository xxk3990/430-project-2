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
            action="/adder_signedIn"
            method="POST"
            className="movieForm">
                <h3 className ="addMovieHeader">Add a plot and trailer for a movie!</h3>
                <span>
                    <label htmlFor = "title">Title: </label>
                    <input id="movieTitle" type="text" name="title" placeholder="Movie title" />
                </span>
                <label className = "warning">Please use roman numerals for numbers and colons wherever possible!</label>
                <span>
                    <label htmlFor = "plot">Plot: </label>
                    <textarea id="moviePlot" name="plot" placeholder="movie plot"/>
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

const setupMovies = function(csrf) {
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
        setupMovies(result.csrfToken);
    })
}
$(document).ready(function() {
    getToken();
})
