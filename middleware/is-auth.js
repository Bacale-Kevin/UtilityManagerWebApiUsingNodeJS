const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).send("Not authenticated");
  }
  const token = authHeader;

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (error) {
    res.status(500).json(error);
  }
  if (!decodedToken) {
    return res.status(401).send("Not authenticated");
  }
  req.role = decodedToken.role;
  next();
};
