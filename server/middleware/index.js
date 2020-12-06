const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/adder');
  }
  return next();
};

const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};
const redirect404 = (req, res) => {
  if (req.session.account) {
    return res.redirect('/adder'); // redirect to adder page if logged in
  }
  return res.redirect('/login'); // redirect to login page if not
};

const bypassSecure = (req, res, next) => {
  next();
};
module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;
module.exports.redirect404 = redirect404;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
