const express = require("express");
const cors = require("cors");
//morgan middleware
const morgan = require("morgan");
const app = express();
//mongodb connection
const { connection } = require("./config/db");
//router connection
const { userRouter } = require("./router/user.router");

const { notFound, errorHandler } = require("./middleware/errorhandler");
require("dotenv").config();
const cookie = require("cookie-parser");
const { productRouter } = require("./router/product.router");

let port = process.env.PORT || 8081;
//middleware's default
app.use(morgan(`dev`));
app.use(express.json());
app.use(cors());
app.use(cookie());
//dummy api for cheking
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//routers
//user_route
app.use("/user", userRouter);
//prod_route
app.use("/product", productRouter);
//blog_route
app.use("/blog", blogRouter);
//cateory route
app.use("/prod-category", categoryRouter);
//blog-category route
app.use("/blog-category", blogcategoryRouter);
//brand route
app.use("/brand", brandRouter);
//coupon route
app.use("/coupon", couponRouter);

//error handlers
app.use(notFound);
app.use(errorHandler);
// connection db||localstorage
app.listen(port, async () => {
  try {
    await connection;
    console.log(
      `MongoDb is conected&&Server is running on port http://localhost:${port}`
    );
  } catch (err) {
    console.log(err, "err connection to db is failed");
  }
});
