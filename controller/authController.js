const userModel = require("../Models/usermodels");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../secrets");

module.exports.signup = async function signup(req, res) {
  try {
    let obj = req.body;
    let user = await userModel.create(obj);
    if (user) {
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({ message: "error while signing up" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// module.exports.login = async function login(req, res) {
//   try {
//     const data = req.body;

//     if (data.email) {
//       let user = await userModel.findOne({ email: data.email });
//       if (data.password == user.password) {
//         let uid = user["_id"];
//         let token = jwt.sign({ payload: uid }, JWT_KEY);
//         res.cookie("login", token, { httpOnly: true });
//         return res.json({
//           message: "user logged in",
//           data: data,
//         });
//       } else {
//         return res.json({ message: "Wrong credentials" });
//       }
//     } else {
//       return res.json({ message: "Email not found" });
//     }
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcrypt -> compare
        if (user.password == data.password) {
          let uid = user["_id"]; //uid
          let token = jwt.sign({ payload: uid }, JWT_KEY, { expiresIn: "15d" });
          res.cookie("login", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 24,
          });
          // res.cookie('isLoggedIn',true);
          return res.json({
            message: "User has logged in",
            data: user, // userDetails:data,
          });
        } else {
          return res.json({
            message: "wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "User not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// module.exports.isAuthorised = async function isAuthorised(roles) {
//   return function (req, res, next) {
//     if (roles.includes(req.role) == true) {
//       next();
//     } else {
//       res.status(401).json({
//         message: "user not authorised",
//       });
//     }
//   };
// };

module.exports.isAuthorised = function (roles) {
  return function (req, res, next) {
    if (roles.includes(req.role)) {
      // Use 'includes' instead of 'include'
      next();
    } else {
      res.status(401).json({
        message: "user not authorised",
      });
    }
  };
};

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      console.log(payload);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        res.json({ message: "please login again" });
      }
    } else {
      const client = req.get("User-Agent");
      if (client.includes("Mozilla") == true) {
        return res.redirect("/login");
      }

      return res.json({ message: "please login again" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //send email to the user
      //nodemailer
    } else {
      return res.json({ message: "please signup" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.resetPassword = async function resetPassword(req, res) {
  const token = req.params.token;

  try {
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({ message: "password changed successfully" });
    } else {
      res.json({ message: "user not found" });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", " ", { maxAge: 1 });
  res.json({
    message: "user logged out successfully",
  });
};
