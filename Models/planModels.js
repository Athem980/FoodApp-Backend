const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://rkathem2001:pDf0L4efmrMNrY4G@cluster0.p4ypj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("plan db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "plan may should not exceed more than 20 character"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price not entered"],
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "discount should not exceed price",
    ],
  },
});

const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//   let plan = {
//     name: "SuperFood1",
//     duration: "25",
//     price: 1000,
//     ratingsAverage: 5,
//     discount: 20,
//   };

//   // const data = await planModel.create(plan);
//   // console.log(data);

//   const doc = new planModel(plan);
//   await doc.save();
// })();
module.exports = planModel;
