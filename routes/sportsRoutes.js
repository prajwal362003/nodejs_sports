const express = require("express");
const router = express.Router();
const Player = require("../models/sports");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPlayer = new Player(data);
    const savedPerson = await newPlayer.save();

    console.log("Data Saved");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log("Error saving data", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const data = await Player.find();
    console.log("Data fetched successfullly");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error fetching data", err);
    res.json({ err: "Error Fetching Data" });
  }
});

// Parameterized endpoints
router.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;
    if (type == "batsman" || type == "bowler" || type == "allrounder") {
      const response = await Player.find({ role: type });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      console.log("Error", err);
      res.status(400).json({ err: "Invalid Type" });
    }
  } catch (err) {
    console.log("Error fetching data", err);
  }
});

// UPDATE ==> PUT METHOD
router.put("/:id", async (req, res) => {
  try {
    const playerId = req.params.id; // Extract the id from then URL parameter
    const data = req.body; // Extract the data from the request body

    const response = await Player.findByIdAndUpdate(playerId, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Player not found" });
    }

    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// DELETE OPERATION
router.delete("/:id", async (req, res) => {
  try {
    const playerId = req.params.id; // Extract the id from then URL parameter
    const response = await Player.findByIdAndDelete(playerId);

    if (!response) {
      return res.status(404).json({ error: "Player not found" });
    }

    console.log("Data Deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
