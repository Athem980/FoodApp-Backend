const express = require("express");
const { protectRoute } = require("../controller/authController.js");
const {
  getAllReviews,

  updateReview,
  deleteReview,
  createReview,
  getPlanReviews,
  top3reviews,
} = require("../controller/reviewController.js");

const reviewRouter = express.Router();

reviewRouter.route("/all").get(getAllReviews);
reviewRouter.route("/top3reviews").get(top3reviews);
reviewRouter.route("/:id").get(getPlanReviews);

// reviewRouter.route("/plan/:id").get(getPlan);

// reviewRouter.use(isAuthorised(["admin", "restaurantowner"]));

reviewRouter.use(protectRoute);
reviewRouter.route("/crud/:plan").post(createReview);

reviewRouter.route("/crud/:id").patch(updateReview).delete(deleteReview);

module.exports = reviewRouter;
