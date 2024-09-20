const express = require("express");
const {
  protectRoute,
  isAuthorised,
} = require("../controller/authController.js");
const {
  getAllPlans,
  getPlan,
  createPlans,
  deletePlans,
  updatePlans,
  top3plans,
} = require("../controller/planController.js");
const planRouter = express.Router();

planRouter.route("/allPlans").get(getAllPlans);

planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

planRouter.use(isAuthorised(["admin", "restaurantowner"]));
planRouter.route("/crudPlan").post(createPlans);

planRouter.route("/crudPlan/:id").patch(updatePlans).delete(deletePlans);
planRouter.route("/top3plans").get(top3plans);
module.exports = planRouter;
