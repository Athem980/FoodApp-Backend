const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");

const db_link =
  "mongodb+srv://rkathem2001:pDf0L4efmrMNrY4G@cluster0.p4ypj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("mongo connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    requred: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deliveryboy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "public\blank-profile-picture-973460_1280.png",
  },
  resetToken: String,
});

userSchema.pre("save", async function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString;
// });

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;

// (async function createUser() {
//   let user = {
//     name: "Levi",
//     email: "Rkathem2002@gmail.com",
//     password: "12345678",
//     confirmPassword: "12345678",
//   };

//   let data = await userModel.create(user);
//   console.log(data);
// })();
