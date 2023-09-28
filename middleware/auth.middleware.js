const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const auth = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.body.userID = decoded.id;
      req.body.username = decoded.username;
      next();
    } else {
      res.status(400).send({ msg: "wrong credential" });
    }
  } else {
    res.status(400).send({ msg: "wrong credential" });
  }
};
module.exports = { auth };
