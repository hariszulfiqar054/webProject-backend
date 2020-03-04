const express = require("express");
const route = express.Router();
const multer = require("multer");
const fs = require("fs");
const newProduct = require("../models/products");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date() + file.filename);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "/jpeg" ||
    file.mimetype === "/JPG" ||
    file.mimetype === "/png"
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
