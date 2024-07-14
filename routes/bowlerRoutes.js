const express = require("express");
const router = express.Router();

const bowler = require("../models/cricketBowlers");

router.get("/", async (req, res) => {
  try {
    const bowlersData = await bowler.find();
    console.log("Data Fetched Successfully");
    res.status(200).json(bowlersData);
  } catch (err) {
    console.log("Error fetching data", err);
    res.status({ err: "Error fetching data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const bowlerData = req.body;
    const newBowler = new bowler(bowlerData);
    const savedBowler = await newBowler.save();
    console.log("Data Saved Successfully");
    res.status(200).json(savedBowler);
  } catch (err) {
    console.log("Error saving data", err);
    res.status(400).json({ err: "Error Saving Data" });
  }
});

router.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;
    if (
      type == "seamer" ||
      type == "medium-fast" ||
      type == "spinner" ||
      type == "china-man"
    ) {
      const bowlerData = await bowler.find({ diffTypes: type });
      console.log("Data fetched successfully");
      res.status(200).json(bowlerData);
    }
  } catch (err) {
    console.log("Error fetching data");
    res.status(400).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
