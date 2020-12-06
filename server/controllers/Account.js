const models = require('../models');
const {
  AccountModel,
} = require('../models/Account');

const {
  Account,
} = models;
const loginPage = (req, res) => {
  res.render('login', {
    csrfToken: req.csrfToken(),
  });
};
const getToken = (request, response) => {
  const req = request;
  const res = response;
  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };
  res.json(csrfJSON);
};
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
const login = (request, response) => {
  const req = request;
  const res = response;
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;
  if (!username || !password) {
    return res.status(400).json({
      error: 'Cut! All fields are required!',
    });
  }
  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Cut! Wrong username and/or password.',
      });
    }
    req.session.account = Account.AccountModel.toAPI(account);
    return res.json({
      redirect: '/adder',
    });
  });
};
const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;
  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({
      error: 'Cut! All fields are required!',
    });
  }
  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({
      error: 'Cut! Passwords do not match!',
    });
  }
  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new AccountModel(accountData);
    const savePromise = newAccount.save();
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({
        redirect: '/adder',
      });
    });
    savePromise.catch((err) => {
      console.log(err);
      if (err.coode === 11000) {
        return res.status(400).json({
          error: 'Cut! Username already in use!',
        });
      }
      return res.status(400).json({
        error: 'An error occurred.',
      });
    });
  });
};
const newPW = (request, response) => {
  const req = request;
  const res = response;
  req.body.oldPW = `${req.body.oldPW}`;
  req.body.newPW = `${req.body.newPW}`;
  req.body.newPW2 = `${req.body.newPW2}`;
  req.body.username = `${req.body.username}`;

  if (req.body.oldPW === req.body.newPW || req.body.oldPW === req.body.newPW2) {
    return res.status(400).json({
      error: 'Cut! New password is the same as the old one!',
    });
  }
  if (req.body.newPW !== req.body.newPW2) {
    return res.status(400).json({
      error: 'Cut! New passwords do not match!',
    });
  }
  if (!req.body.oldPW || !req.body.newPW || !req.body.newPW2) {
    return res.status(400).json({
      error: 'Cut! All fields are required.',
    });
  }
  if (req.body.username !== req.session.account.username) {
    return res.status(400).json({
      error: 'Cut! The username you entered is not the one associated with this account.', //bonus security measure just in case
    });
  }
  return Account.AccountModel.generateHash(req.body.newPW, (salt, hash) => {
    console.log('hash function reached');
    const newPWData = {
      _id: req.session.account._id,
      salt,
      password: hash,
    };
    const options = {
      new: true,
    };
    // https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
    // and https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    return Account.AccountModel.findByIdAndUpdate(newPWData._id, {
        password: newPWData.password,
      },
      {options}, (err, doc) => {
        if (err) {
          console.log(`error: ${err}`);
        } else {
          //console.log(`new pw: ${newPWData.password}`);
          // return res.json({
          //   redirect: '/login' //have em login again to verify
          // })
        }
      },
    );
  });
};
// const userList = (req, res) => {
//   res.render('userList');
// };

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.newPW = newPW;
// module.exports.userList = userList;
