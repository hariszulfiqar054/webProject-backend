const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
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

mongoose
  .connect("mongodb://localhost:27017/WebProject")
  .then(success => console.log("Successfully connected to database"))
  .catch(err => console.log("Error while connecting to database"));

app.listen(port, () => console.log(`App listening on port : ${port}`));
