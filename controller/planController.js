const planModel = require("../Models/planModels.js");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({ message: "all plans retrieved", data: plans });
    } else {
      return res.json({ message: "plans not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({ message: " plan retrieved", data: plan });
    } else {
      return res.json({ message: "plan not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createPlans = async function createPlans(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "plan created successfully",
      data: createdPlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deletePlans = async function deletePlans(req, res) {
  try {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.json({
      message: "plan deleted successfully",
      data: deletedPlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updatePlans = async function updatePlans(req, res) {
  try {
    let id = req.params.id;
    console.log("hello", id);
    let datatobeupdated = req.body;
    let keys = [];
    for (let key in datatobeupdated) {
      keys.push(key);
    }
    let plan = await planModel.findById(id);
    console.log(plan);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = datatobeupdated[keys[i]];
    }
    await plan.save();

    res.json({
      message: "plan updated successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.top3plans = async function top3plans(req, res) {
  try {
    let topthreePlans = await planModel
      .find()
      .sort({ ratingsAverage: -1 })
      .limit(3);
    return res.json({ message: "top three plans", data: topthreePlans });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
