const planModel = require("../Models/planModels");
const reviewModel = require("../Models/reviewModels");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({ message: "all reviews retrieved", data: reviews });
    } else {
      return res.json({ message: "reviews not found" });
    }
  } catch (error) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.top3reviews = async function top3reviews(req, res) {
  try {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (reviews) {
      return res.json({ message: "top3 reviews retrieved", data: reviews });
    } else {
      return res.json({ message: "reviews not found" });
    }
  } catch (error) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    const id = req.params.id;
    let reviews = await reviewModel.find();

    reviews = reviews.filter((review) => review.plan._id == id);

    if (reviews) {
      return res.json({ message: " reviews retrieved", data: reviews });
    } else {
      return res.json({ message: "review not found" });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    let review = await reviewModel.create(req.body);
    plan.ratingsAverage = (plan.ratingsAverage + req.body.ratings) / 2;

    await review.save();
    return res.json({
      message: " review created",
      data: review,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports.updateReview = async function (req, res) {
  try {
    let id = req.params.id;
    let datatobeupdated = req.body;
    let keys = [];
    for (let key in datatobeupdated) {
      keys.push(key);
    }
    let review = await reviewModel.findById(id);

    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = datatobeupdated[keys[i]];
    }
    await review.save();

    return res.json({
      message: "review updated",
      data: review,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    let id = req.params.id;
    let deletedData = await reviewModel.findByIdAndDelete(id);
    return res.json({
      message: "review deleted",
      data: deletedData,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
