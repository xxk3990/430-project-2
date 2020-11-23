const models = require('../models');

const { Movie } = models;

const adderPage = (req, res) => {
  Movie.MovieModel.findAllMovies((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), movies: docs });
  });
};

const addMovie = (req, res) => {
  if (!req.body.title || !req.body.rating || !req.body.reviewer || !req.body.trailer || !req.body.review || !req.body.plot) {
    return res.status(400).json({ error: 'Title, plot, rating, review and trailer are required!' });
  }
  const movieData = {
    title: req.body.title,
    plot: req.body.plot,
    review: {
      review: req.body.review,
      reviewer: req.body.reviewer,
      rating: req.body.rating,
    },
    trailer: req.body.trailer,
    user: req.session.account._id,
  };

  const newMovie = new Movie.MovieModel(movieData);
  const moviePromise = newMovie.save();
  moviePromise.then(() => res.json({ redirect: '/adder' }));
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
  const req = request;
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
module.exports.add = addMovie;
