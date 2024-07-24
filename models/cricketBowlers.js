const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bowlerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  franchise: {
    type: String,
    required: true,
  },

  matchesPlayed: {
    type: Number,
  },

  noOfWickets: {
    type: Number,
    required: true,
  },

  diffTypes: {
    type: String,
    enum: ["seamer", "spinner", "medium-pacer", "china-man"],
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// pre-save fn => we need to hash the password pre(before) it enters in the database
bowlerSchema.pre("save", async function (next) {
  const bowler = this;
  // Hash the password only if it has been modified or new
  if (!bowler.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // Now hash the password
    const hashedPassword = await bcrypt.hash(bowler.password, salt);

    // Now override the plain password with the hashed password
    bowler.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

bowlerSchema.methods.comparePassword = async function (playerPassword) {
  try {
    // Use bcrypt to compare provided password with the jhashed password
    const isMatch = await bcrypt.compare(playerPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

/* How above function works(V.V.IMP)

for eg :- if the password 'Prajwal' is stored so the password stored in the db be 'jhdjsdnksdkwdhskd'
and when we try to login with the password 'Sarthak' then,
firstly salt is extracted from this => jhdjsdnksdkwdhskd 
then salt + Sarthak combines to form a hash lets say => 'hdkwhksfhkfnksnf'
& lastly it compares jhdjsdnksdkwdhskd === hdkwhksfhkfnksnf (i.e the resukt hash is compared with the stored hash)
*/

const bowler = mongoose.model("bowler", bowlerSchema);
module.exports = bowler;
