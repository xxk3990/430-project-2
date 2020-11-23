const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/profile', mid.requiresLogin, controllers.Movie.profile);
  app.get('/getByUser', mid.requiresLogin, controllers.Movie.getMoviesByUser);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/adder', mid.requiresLogin, controllers.Movie.adderPage);
  app.post('/adder', mid.requiresLogin, controllers.Movie.add);
  app.get('/allMovies', mid.requiresLogin, controllers.Movie.getAllMovies);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};
module.exports = router;
