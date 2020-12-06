const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/profile', mid.requiresSecure, mid.requiresLogin, controllers.Movie.profile);
  app.get('/getByUser', mid.requiresLogin, controllers.Movie.getMoviesByUser);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/adder', mid.requiresLogin, controllers.Movie.addMovie);
  app.get('/adder', mid.requiresLogin, controllers.Movie.adderPage);
  app.get('/allMovies', mid.requiresLogin, controllers.Movie.getAllMovies);
  app.post('/newPW', mid.requiresSecure, mid.requiresLogin, controllers.Account.newPW);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('*', mid.redirect404);
};
module.exports = router;
