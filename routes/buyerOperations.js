const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Buyer = require("../models/user");
const authMiddleware = require("../middleware/authenticateToken");
const jwt = require("jsonwebtoken");
//Get all the user route
route.get("/", authMiddleware, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(503).send({
      success: false,
      message: "Server error"
    });
  }
});

//Login user route
route.post("/loginBuyer", async (req, res) => {
  const { email, password } = req.body;
  try {
    const getBuyer = await Buyer.find({
      email,
      password
    });
    if (getBuyer.length > 0) {
      let token = jwt.sign({ id: getBuyer[0]._id }, "secret_key");
      res
        .header("auth-token", token)
        .status(200)
        .send({
          success: true,
          message: "Successfully login",
          data: getBuyer,
          token
        });
    } else {
      console.log("else");
      res.status(404).send({
        success: false,
        message: "User not found!"
      });
    }
  } catch (err) {
    console.log("catch");
    res.status(503).send({
      success: false,
      message: "Server error"
    });
  }
});

//Register the buyer route
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
