const express = require("express");
const router = express.Router();
// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("../auth");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

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

// Same above function for jwt token concept
router.post("/signup", async (req, res) => {
  try {
    const bowlerData = req.body;
    const newBowler = new bowler(bowlerData);
    const savedBowler = await newBowler.save();
    console.log("Data Saved Successfully");

    const payload = {
      id: savedBowler.id,
      username: savedBowler.username,
    };
    const token = generateToken(payload);
    console.log(JSON.stringify(payload));
    // const token = generateToken(savedBowler.username); // savedBowler.username => payload [can pass anything of schema in payload]
    console.log("Token is ", token);
    res.status(200).json({ savedBowler: savedBowler, token: token });
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

// // Authentication using Passport.js
// // Passport.js for Authentication
// passport.use(
//   new LocalStrategy(async (USERNAME, password, done) => {
//     console.log("Authenticating User");

//     // Authentication Logic
//     try {
//       console.log("Received Credentials", USERNAME, password);
//       const user = await bowler.findOne({ userName: USERNAME });

//       if (!user) {
//         return done(NULL, false, { message: "Incorrect Username" });
//       }

//       const isPasswordMatch = user.password == password;
//       if (isPasswordMatch) {
//         return done(NULL, user);
//       } else {
//         return done(NULL, false, { message: "Incorrect Password" });
//       }
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.initialize();

// Route just for authentication
// router.get(
//   "/",
//   passport.authenticate("local", { session: false }),
//   async (req, res) => {
//     try {
//       const bowlerData = await bowler.find();
//       console.log("Data fetched successfully");
//       res.status(200).json(bowlerData);
//     } catch (err) {
//       console.log("Error fetching data");
//       res.status(400).send({ err: "Internal Server Error" });
//     }
//   }
// );

module.exports = router;
