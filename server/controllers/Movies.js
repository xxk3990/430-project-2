const models = require('../models');

const { Movie } = models;

const adderPage = (req, res) => { // signed in main app page
  Movie.MovieModel.findAllMovies((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app-signedIn', { csrfToken: req.csrfToken(), movies: docs });
  });
};

const publicApp = (req, res) => { // public app page
  Movie.MovieModel.findAllMovies((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app-public', { movies: docs });
  });
};

const addMovie = (req, res) => {
  if (!req.body.title || !req.body.trailer || !req.body.plot) {
    return res.status(400).json({ error: 'Title, plot, and trailer are required!' });
  }
  const noDuplicate = req.body.title.toUpperCase(); // helps prevent duplicates
  const movieData = {
    title: noDuplicate,
    plot: req.body.plot,
    trailer: req.body.trailer,
    user: req.session.account._id,
  };

  const newMovie = new Movie.MovieModel(movieData);
  const moviePromise = newMovie.save();
  moviePromise.then(() => res.json({ redirect: '/app-signedIn' }));
  moviePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Cut! Movie already exists!' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  });
  return moviePromise;
};
const getMoviesByUser = (request, response) => {
  const req = request;
  const res = response;
  return Movie.MovieModel.findByUser(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred.' });
    }
    return res.json({ movies: docs });
  });
};
// const addFavorite = (request, response) => { //add movie to favorites
//   const req = request;
//   const res = response;
//   const fav = {
//     title: req.body.title,
//     plot: req.body.plot,
//     review: {
//       reviewerName: req.body.reviewerName,
//       rating: req.body.rating,
//       review: req.body.review,
//     },
//     trailer: req.body.trailer,
//     isFavorite: req.body.isFavorite,
//   }
//   const newFavorite = new Favorite.FavoriteModel(fav);
//   const favPromise = newFavorite.save();
//   favPromise.then(() => res.json ({redirect: '/adder'}));
//   favPromise.catch((err) => {
//     console.log(err);
//     if(err.code === 11000) {
//       return res.status(400).json({error: 'Cut! Movie already in favorites.'})
//     }
//     return res.status(400).json({ error: 'An error occurred' });
//   })
//   return favPromise;
// };
// const getFavorites = (request, response) => {
//   const req = request;
//   const res = response;
//   const fave = {
//     fv: true,
//   }
//   return Favorite.FavoriteModel.findFavorites(fave.fv, req.session.account._id, (err, docs) => {
//     if (err) {
//       console.log(err);
//       return res.status(400).json({ error: 'an error occurred.' });
//     }
//     return res.json({ favorites: docs });
//   });
// }

const profilePage = (req, res) => {
  Movie.MovieModel.findByUser(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('profile', { csrfToken: req.csrfToken(), movies: docs });
  });
};

const getAllMovies = (request, response) => {
  const res = response;
  return Movie.MovieModel.findAllMovies((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred.' });
    }
    return res.json({ movies: docs });
  });
};
module.exports.adderPage = adderPage;
module.exports.getMoviesByUser = getMoviesByUser;
module.exports.getAllMovies = getAllMovies;
module.exports.profile = profilePage;
module.exports.addMovie = addMovie;
// module.exports.addFavorite = addFavorite;
// module.exports.getFavorites = getFavorites;
module.exports.publicApp = publicApp;
