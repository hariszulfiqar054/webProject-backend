const express = require("express");
const route = express.Router();
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const newProduct = require("../models/products");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/JPG" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

route.post("/addProduct", upload.single("productImages"), (req, res) => {
  const { title, description, startingBid } = req.body;
  const newItem = new newProduct({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    startingBid,
    productImages: req.file.path
  });
  newItem
    .save()
    .then(response => {
      res.status(200).send({
        message: "Successfully Added Product",
        response
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error while adding to products",
        Error: err.message
      });
    });
});
module.exports = route;
