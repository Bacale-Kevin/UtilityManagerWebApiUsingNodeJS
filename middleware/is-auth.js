const jwt = require("jsonwebtoken");
const  {roles}  = require('../server/role');

//Middleware to allow access to only login users 
  exports.isLoggedIn = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).send("Not authenticated");
  }
  const token = authHeader;
  console.log(token)

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
    console.log(decodedToken);
  } catch (error) {
    res.status(500).json(error);
  }
  if (!decodedToken) {
    return res.status(401).send("Not authenticated");
  }
  //Extract the information from the toke  and take the role
  req.user = decodedToken.role;
  console.log('checking ...', req.user);
  next();
};


exports.grantAccess = function(action, resource) {

  return async (req, res, next) => {
 
   try {
 
    const permission = roles.can(req.user.role);
 
    if (!permission.granted) {
 
     return res.status(401).json({
 
      error: "You don't have enough permission to perform this action"
 
     });
 
    }
 
    next()
 
   } catch (error) {
 
    console.log(error);
    res.json(error);
 
   }
 
  }
 
 }
