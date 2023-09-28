const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { userModel } = require("../model/user.model");
dotenv.config();

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ msg: "give all details" });
  }
  try {
    bcrypt.hash(password, 2, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(400).json({ msg: "not store data" });
      }

      const userData = new userModel({ ...req.body, password: hash });
      await userData.save();
      res.status(201).json({ msg: "register succesfully" });
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email });
    if (userData) {
      bcrypt.compare(password, userData.password, function (err, result) {
        // result == true
        if (result) {
          res.status(201).json({
            msg: "login succesfuly",
            name: userData.username,
            token: jwt.sign(
              { id: userData._id, username: userData.username },
              process.env.SECRET_KEY,
              {
                expiresIn: "7d",
              }
            ),
          });
        } else {
          res.status(400).json({ msg: "wrong credential" });
        }
      });
    } else {
      res.status(400).json({ msg: "wrong credential" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { userLogin, userRegister };
