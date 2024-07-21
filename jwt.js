const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).res({ error: "Unauthorized" });
  }

  try {
    // Verify the JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user info to the request object
    req.user = decoded; // can write other variable name(req.encodedData,req.payloadUser)
    next();
  } catch (err) {
    console.log(err);
    res.status(401).res({ err: "Invalid Token" });
  }
};

// Generate Token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };
