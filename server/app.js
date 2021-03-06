const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');
const redis = require('redis');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/MovieAPI';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false, // required for findByIdAndUpdate(),
  // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
};
mongoose.connect(dbURL, mongooseOptions, (err) => {
  if (err) {
    console.log("Couldn't conenct to database");
    throw err;
  }
});
let redisURL = {
  hostname: 'redis-19307.c99.us-east-1-4.ec2.cloud.redislabs.com',
  port: '19307',
};
let redisPASS = 'JuROWcXCk37oignkzUGAAW18q6qYMjBb';
if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  [, redisPASS] = redisURL.auth.split(':');
}
const redisClient = redis.createClient({
  host: redisURL.hostname,
  port: redisURL.port,
  password: redisPASS,
});

const router = require('./router.js');

const app = express();
// Background image from: https://pixabay.com/photos/cinema-hall-film-cinema-lovers-2502213/
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
// favicon from: https://pixabay.com/vectors/clapperboard-black-cut-director-29986/
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'Lights Camera Action',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADSCRFTOKEN') {
    return next(err);
  }
  console.log('Missing CSRF token');
  return false;
});
router(app);
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
