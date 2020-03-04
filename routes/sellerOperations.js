const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Seller = require("../models/user");

route.get("/", async (req, res) => {
  const sellerData = await Seller.find({ userType: "seller" });
  if (sellerData.length === 0) {
    res.status(200).send({
      success: true,
      data: sellerData,
      message: "No Seller registered"
    });
  } else {
    res.status(200).send({
      success: true,
      data: sellerData
    });
  }
});

route.post("/registerSeller", async (req, res) => {
  console.log("hi");
  const { name, email, password } = req.body;
  const newSeller = new Seller({
    _id: new mongoose.Types.ObjectId(),
    name,
    userType: "seller",
    email,
    password
  });

  newSeller
    .save()
    .then(response => {
      res.status(200).send({
        success: true,
        message: "Successfully Registered",
        data: response
      });
    })
    .catch(err => {
      res.status(400).send({
        success: false,
        message: "Not registered",
        Error: err
      });
    });
});
module.exports = route;
