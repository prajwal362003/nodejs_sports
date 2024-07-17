const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bowler = require("./models/cricketBowlers");

// Passport.js for Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("Authenticating User");

    // Authentication Logic
    try {
      // console.log("Received Credentials", username, password);
      const user = await bowler.findOne({ username });

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      // Before hashing password
      // const isPasswordMatch = user.password == password;

      // After hashing password
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
