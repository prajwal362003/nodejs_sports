const db = require("./db");
// const Player = require("../models/sports");
// const indPlayer = require("./models/cricketPlayers");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
//1] FS & OS Modules

// var os = require("os");
// var fs = require("fs");

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile("greeting.txt", "Hi" + user.username + "!\n", () => {
//   console.log("File is created");
// });

// 2] Creating a server
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my hotel, how can i help you");
});

// app.get("/veg", (req, res) => {
//   res.send("Welcome to the Prajwal's veg restaurant");
// });

// app.get("/non-veg", (req, res) => {
//   res.send("Welcome to the Prajwal's non-veg restaurant");
// });

app.use(bodyParser.json()); // req.body

// POST METHOD
// app.post("/sports", async (req, res) => {
//   try {
//     const data = req.body;
//     const newPlayer = new Player(data);
//     const savedPerson = await newPlayer.save();

//     console.log("Data Saved");
//     res.status(200).json(savedPerson);
//   } catch (err) {
//     console.log("Error saving data", err);
//     res.status(500).json({ err: "Internal Server Error" });
//   }
// });

// // GET METHOD
// app.get("/sports", async (req, res) => {
//   try {
//     const data = await Player.find();
//     console.log("Data fetched successfullly");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log("Error fetching data", err);
//     res.json({ err: "Error Fetching Data" });
//   }
// });

// // Parameterized ednpoints
// app.get("/sports/:type", async (req, res) => {
//   try {
//     const type = req.params.type;
//     if (type == "batsman" || type == "bowler" || type == "allrounder") {
//       const response = await Player.find({ role: type });
//       console.log("Response Fetched");
//       res.status(200).json(response);
//     } else {
//       console.log("Error", err);
//       res.status(400).json({ err: "Invalid Type" });
//     }
//   } catch (err) {
//     console.log("Error fetching data", err);
//   }
// });

// Instead of using above routes, use express router & app.use() them here
const sportsRoutes = require("./routes/sportsRoutes");
app.use("/sports", sportsRoutes);

// // POST METHOD => (FOR cricketPlayer.js)
// app.post("/indPlayer", async (req, res) => {
//   try {
//     const data = req.body;
//     const newPlayer = new indPlayer(data);

//     const savedPlayer = await newPlayer.save();
//     console.log("Data Saved");
//     res.status(200).json(savedPlayer);
//   } catch (err) {
//     console.log("Error saving data", err);
//     res.status(400).json({ err: "Internal Server Error" });
//   }
// });

// // GET METHOD => (FOR cricketPlayers.js)
// app.get("/indPlayer", async (req, res) => {
//   try {
//     const data = await indPlayer.find();
//     console.log("Data fetched successfullly");
//     res.status(200).json(data);
//   } catch {
//     console.log("Error fetching data", err);
//     res.json({ err: "Error Fetching Data" });
//   }
// });

// Again using express router for the above two methods(POST & GET)
const indPlayerRourtes = require("./routes/indPlayerRoutes");
app.use("/indPlayer", indPlayerRourtes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
