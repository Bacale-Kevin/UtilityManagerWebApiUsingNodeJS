const jwt = require("jsonwebtoken");
const  {roles}  = require('../server/role');

//Middleware to allow access to only login users 
  exports.isLoggedIn = (req, res, next) => {
    //Getting the auth header
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
  /* Don't forget isLoggedIn is a middleware that which information can be accessible by the next middleware
  req.user = decodedToken.role which means in the next middleware we can access req.user to have the role found in our decoded token
  that is why in our next middleware that is accessControl we can access req.user   */
  //Extract the information from the toke  and take the role
  req.user = decodedToken.role;
  console.log('checking ...', req.user);
  next();
};

//These middleware those not work when exporting it to the route folder so i implimented it directly in the routes 
exports.grantAccess = function(action, resource) {

  return async (req, res, next) => {
 
   try {
 
    const permission = roles.can(req.user);
 
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
