const express = require("express");
const { connection } = require("./config/db");
const { userRouteHandler } = require("./routes/user.route");
const { auth } = require("./middleware/auth.middleware");
const { blogRouteHandler } = require("./routes/blog.route");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouteHandler);
app.use(auth);
app.use("/api", blogRouteHandler);
app.listen(8020, async () => {
  try {
    await connection;
    console.log("db connect");
  } catch (error) {
    console.log(error);
  }
  console.log("server connected");
});
