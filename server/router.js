const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/newPW', mid.requiresSecure, mid.requiresLogin, controllers.Account.newPW);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/profile', mid.requiresSecure, mid.requiresLogin, controllers.Movie.profile);
  app.get('/getByUser', mid.requiresLogin, controllers.Movie.getMoviesByUser);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/app-public', controllers.Movie.publicApp);
  app.get('/app-signedIn', mid.requiresLogin, controllers.Movie.adderPage);
  app.get('/reviews', controllers.Review.reviewPage);
  app.get('/allMovies', controllers.Movie.getAllMovies);
  app.post('/adder_signedIn', mid.requiresLogin, controllers.Movie.addMovie);
  app.post('/addReview-signedIn', mid.requiresLogin, controllers.Review.addReview);
  // //can't search without a csrf token so have to be logged in
  // app.get('/searchReviews', mid.requiresLogin, controllers.Review.getReviewsFromSearch);
  app.get('/allReviews', controllers.Review.getAddedReviews);
  app.get('/reviews-public', controllers.Review.publicReviewPage);
  app.get('/reviewsByUser', mid.requiresLogin, mid.requiresSecure, controllers.Review.getReviewsByUser);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Movie.publicApp);
  app.get('*', mid.redirect404);
};
module.exports = router;
