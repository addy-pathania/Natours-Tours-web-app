import mongoose, { Schema } from 'mongoose';

const TourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  slug: String,
  // difficulty: {
  //   type: String,
  //   required: true,
  //   enum: ['easy', 'medium', 'hard'],
  // },
  // duration: {
  //   type: Number,
  //   required: true,
  // },
  // maxGroupSize: {
  //   type: Number,
  //   required: true,
  // },
  // description: {
  //   type: String,
  //   trim: true,
  // },
  // imageCover: {
  //   type: String,
  //   required: true,
  // },
  // ratingsAverage: {
  //   type: Number,
  //   default: 3,
  // },
  // ratingsQuantity: {
  //   type: Number,
  //   default: 0,
  // },
  // TODO: implement image upload feature
  // images: [String],
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // startDates: {
  //   type: [Date],
  // },
});

const TourModel = mongoose.model('Tour', TourSchema);

export default TourModel;
