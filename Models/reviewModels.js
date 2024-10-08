const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://rkathem2001:pDf0L4efmrMNrY4G@cluster0.p4ypj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("review db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "review must belong to a plan"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    required: [true, "review must belong to a plan"],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name profileImage" }).populate("plan");
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;
