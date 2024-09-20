const userModel = require("../Models/usermodels.js");

module.exports.getsignupusers = async function getsignupusers(req, res) {
  let allusers = await userModel.find();

  res.json({ message: "list of all users", data: allusers });
};

//   function setCookies(req, res) {
//     res.cookie("isLoggedIn", true, {
//       maxAge: 1000 * 60 * 60 * 24,
//       secure: true,
//     });

//     res.send("cookies has been set");
//   }

//   function getCookies(req, res) {
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("cookies received");
//   }

module.exports.getUser = async function getUser(req, res) {
  let id = req.id;
  let user = await userModel.findById(id);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let datatobeupdated = req.body;
    if (user) {
      const keys = [];
      for (let key in datatobeupdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = datatobeupdated[keys[i]];
      }
      user.confirmPassword = user.password;
      const updatedData = await user.save();
      return res.json({
        message: "data updated successfully",
        data: updatedData,
      });
    } else {
      return res.json({ message: "user not found" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "user deleted",
      data: user,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "user retrieved",
        data: users,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
