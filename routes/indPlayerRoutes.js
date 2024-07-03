const express = require("express");
const router = express.Router();

const indPlayer = require("../models/cricketPlayers");

// POST METHOD => (FOR cricketPlayer.js)
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPlayer = new indPlayer(data);

    const savedPlayer = await newPlayer.save();
    console.log("Data Saved");
    res.status(200).json(savedPlayer);
  } catch (err) {
    console.log("Error saving data", err);
    res.status(400).json({ err: "Internal Server Error" });
  }
});

// GET METHOD => (FOR cricketPlayers.js)
router.get("/", async (req, res) => {
  try {
    const data = await indPlayer.find();
    console.log("Data fetched successfullly");
    res.status(200).json(data);
  } catch {
    console.log("Error fetching data", err);
    res.json({ err: "Error Fetching Data" });
  }
});

// Parameterized endpoints
router.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;
    if (type == "king" || type == "hitman" || type == "thala") {
      const data = await indPlayer.find({ players: type });
      console.log("Data fetched successfullly");
      res.status(200).json(data);
    }
  } catch (err) {
    console.log("Error", err);
    res.status(400).json({ err: "Internal Server Error" });
  }
});

// UPDATE => PUT METHOD
router.put("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const indData = req.body;

    const response = await indPlayer.findByIdAndUpdate(playerId, indData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ err: "Player not found" });
    }

    console.log("Player Updated Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const response = await indPlayer.findByIdAndDelete(playerId);

    if (!response) {
      return res.status(404).json({ err: "Player not found" });
    }

    console.log("PLayer Deleted Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error deleting Player", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// comment addded for testing purpose
module.exports = router;
