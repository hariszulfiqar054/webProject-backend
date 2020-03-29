const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");
const Buyer = require("./routes/buyerOperations");
const Seller = require("./routes/sellerOperations");
const Products = require("./routes/products");
const port = 61500;
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/buyer", Buyer);
app.use("/seller", Seller);
app.use("/products", Products);

// if (!config.get("jwtPrivateKey")) {
//   console.error("jwtPrivateKey is not define");
//   process.exit(1);
// }

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

mongoose
  .connect("mongodb://localhost:27017/WebProject")
  .then(success => console.log("Successfully connected to database"))
  .catch(err => console.log("Error while connecting to database"));

app.listen(port, () => console.log(`App listening on port : ${port}`));
