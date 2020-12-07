const models = require('../models');

const { Review } = models;
const reviewPage = (req, res) => {
  Review.ReviewModel.findAllReviews((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('reviews-signedIn', { csrfToken: req.csrfToken(), reviews: docs });
  });
};

const publicReviewPage = (req, res) => {
  Review.ReviewModel.findAllReviews((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('reviews-public', { reviews: docs });
  });
};

const addReview = (req, res) => {
  if (!req.body.title || !req.body.rating || !req.body.reviewerName
    || !req.body.review) {
    return res.status(400).json({ error: 'Cut! Title, rating, and review data are required!' });
  }
  const reviewData = {
    title: req.body.title.toUpperCase(),
    review: {
      review: req.body.review,
      reviewerName: req.body.reviewerName,
      rating: req.body.rating,
    },
    user: req.session.account._id,
  };

  const newReview = new Review.ReviewModel(reviewData);
  const reviewPromise = newReview.save();
  reviewPromise.then(() => res.json({ redirect: '/app-signedIn' }));
  reviewPromise.catch((err) => {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred' });
  });
  return reviewPromise;
};
const getAddedReviews = (request, response) => {
  // get added reviews
  const res = response;
  return Review.ReviewModel.findAllReviews((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred.' });
    }
    return res.json({ reviews: docs });
  });
};
const getReviewsByUser = (request, response) => {
  const req = request; // gets rendered on profile page
  const res = response;
  return Review.ReviewModel.findByUser(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred.' });
    }
    return res.json({ reviews: docs });
  });
};
// const getReviewsFromSearch = (req, res) => {
//   const result = req.query.title;
//   console.log(result)
//   return Review.ReviewModel.findBySearch(result, (err, docs) => {
//     if (err) {
//       console.log(err);
//     }
//     return res.json({ reviews: docs });
//   });
// };

module.exports.addReview = addReview;
module.exports.getAddedReviews = getAddedReviews;
module.exports.getReviewsByUser = getReviewsByUser;
// module.exports.getReviewsFromSearch = getReviewsFromSearch;
module.exports.reviewPage = reviewPage;
module.exports.publicReviewPage = publicReviewPage;
