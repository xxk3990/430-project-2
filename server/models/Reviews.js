const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');
const {
  v4: uuidv4,
} = require('uuid');

let ReviewModel = {};
const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();
const createID = (uniqueID) => uuidv4(uniqueID);

const ReviewSchema = new mongoose.Schema({ // same except no trailer or plot
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  review: { // review props are in nested object
    review: {
      type: String,
      required: true,
    },
    reviewerName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  uniqueID: {
    type: String,
    default: createID,
  },
});
ReviewSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  review: doc.review.review,
  reviewerName: doc.review.reviewerName,
  rating: doc.review.rating,
});
ReviewSchema.statics.findAllReviews = (callback) => {
  const showAll = {};
  return ReviewModel.find(showAll).select('title review reviewerName rating').lean().exec(callback);
};
ReviewSchema.statics.findByUser = (userId, callback) => {
  const search = {
    user: convertId(userId),
  };
  return ReviewModel.find(search).select('title review reviewerName rating').lean().exec(callback);
};

// ReviewSchema.statics.findBySearch = (title, callback) => {
//   const filter = {
//     title: title,
//   };
// https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose
//   ReviewSchema.index({title: filter.name})
// return ReviewModel.find({$text:{$search: filter}}).select
// ('title review reviewerName rating').lean().exec(callback);
// };

ReviewModel = mongoose.model('Reviews', ReviewSchema);
module.exports.ReviewModel = ReviewModel;
module.exports.ReviewSchema = ReviewSchema;
