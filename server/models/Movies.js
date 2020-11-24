const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');
const {
  v4: uuidv4,
} = require('uuid');

let MovieModel = {};
const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();
const createID = (uniqueID) => uuidv4(uniqueID);

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  plot: {
    type: String,
    required: true,
  },
  review: { // review props are in nested object
    review: {
      type: String,
      required: true,
    },
    reviewer: {
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
  trailer: {
    type: String,
    required: true,
  },
});

MovieSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  plot: doc.plot,
  review: doc.review.review,
  reviewer: doc.review.reviewer,
  rating: doc.review.rating,
  trailer: doc.trailer,
});
MovieSchema.statics.findByUser = (userId, callback) => {
  const search = {
    user: convertId(userId),
  };
  return MovieModel.find(search).select('title plot review reviewer rating trailer').lean().exec(callback);
};
MovieSchema.statics.findAllMovies = (callback) => {
  const showAll = {};
  return MovieModel.find(showAll).select('title plot review reviewer rating trailer').lean().exec(callback);
};
MovieModel = mongoose.model('Movies', MovieSchema);
module.exports.MovieModel = MovieModel;
module.exports.MovieSchema = MovieSchema;
