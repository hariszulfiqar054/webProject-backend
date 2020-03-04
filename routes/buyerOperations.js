const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Buyer = require("../models/user");

route.get("/", async (req, res) => {
  const buyerData = await Buyer.find({ userType: "buyer" });
  if (buyerData.length === 0) {
    res.status(200).send({
      success: true,
      data: buyerData,
      message: "No Buyer registered"
    });
  } else {
    res.status(200).send({
      success: true,
      data: buyerData
    });
  }
});

route.post("/registerBuyer", async (req, res) => {
  const { name, email, password } = req.body;
  const newBuyer = new Buyer({
    _id: new mongoose.Types.ObjectId(),
    name,
    userType: "buyer",
    email,
    password
  });

  newBuyer
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
