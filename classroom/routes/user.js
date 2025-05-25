const express= require("express");
const router= express.Router();
//Index - users
router.get("/", (req, res) => {
  res.send("GET for Users");
});

//Show - users
router.get("/:id", (req, res) => {
  res.send("GET for Show Users");
});

//POST - users
router.post("", (req, res) => {
  res.send("POST for Users");
});

//Delete - users
router.delete("/:id", (req, res) => {
  res.send("DELETE for Users");
});

module.exports= router;