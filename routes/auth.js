const express = require("express");
const AuthController = require("../controllers/auth");
const { body } = require("express-validator");
const router = express.Router();
const Model = require("../models/user");
const isAuth = require("../middleware/is-auth");
const accessControl = require("accesscontrol");

// const role = Model.User.findOne({
//   where: {role: req.body.role}
// })

const ac = new accessControl();

ac.grant("seller")

ac.grant("manager")
  .extend("seller")
  .readAny("user")
  .updateAny('user')
  .delete('user')

ac.grant("admin")

//SignUp users
router.post(
  "/signup",
  //Adding some server side validation as a middleware
  [
    body("firstName")
      .notEmpty()
      .isLength({ min: 2 }),
    body("sex")
      .trim()
      .notEmpty(),
    body("email")
      .trim()
      .notEmpty()
      .isEmail() //Verify that the email address taken by the user does not exist in the DB since email should be unique to every users 
      .custom((value, { req }) => {
        return Model.User.findOne({ where: { email: value } }).then(
          userEmail => {
            if (userEmail) {
              return Promise.reject("Email address already exists!");
            }
          }
        );
      })
      .normalizeEmail(),
    body("phone")
      .isMobilePhone()
      .trim()
      .notEmpty()
      .custom((value, { req }) => {
        //Checking if the entered phone number already exist
        return Model.User.findOne({ where: { phone: value } }).then(
          userPhone => {
            if (userPhone) {
              return Promise.reject("Phone number already exist!");
            }
          }
        );
      }),
    body("idCardNumber")
      .trim()
      .notEmpty()//IDCard should have exactly 9 varchar length
      .isLength({ min: 9, max: 9 })
      .custom((value, { req }) => {
        return Model.User.findOne({ where: { idCardNumber: value } }).then(
          idCard => {
            if (idCard) {
              return Promise.reject("Id card number already exist!");
            }
          }
        );
      }),
    body("role")
      .trim()
      .notEmpty(),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
  ],
  AuthController.signUp
);

router.post("/login", AuthController.loginUser);

//Get a single user
router.get('/user/:id',
//IsLoggedIn is our middleware that allows only users that have login to access this route 
  isAuth.isLoggedIn,
  //This middleware checks if the users can access these route base on its role
  (req, res, next) => {
    
    const permission = ac.can(req.user).readOwn("user");
    console.log("Permission", permission.granted);
    console.log(permission.attributes);
    if (!permission.granted) {
      return res.status(401).json({
        error: "You don't have enough permission to perform this action"
      });
    }
    next();
  }
,AuthController.getOneUser);

  //Get all users
router.get(
  "/users",
  isAuth.isLoggedIn,
  (req, res, next) => {
    
    const permission = ac.can(req.user).readAny("user");
    console.log("Permission", permission.granted);
    console.log(permission.attributes);
    if (!permission.granted) {
      return res.status(401).json({
        error: "You don't have enough permission to perform this action"
      });
    }
    next();
  },
  AuthController.getAllUsers
);


//Update user
router.put(
  "/user/:id",
  isAuth.isLoggedIn,
  (req, res, next) => {
    
    const permission = ac.can(req.user).updateAny("user");
    console.log("Permission", permission.granted);
    console.log(permission.attributes);
    if (!permission.granted) {
      return res.status(401).json({
        error: "You don't have enough permission to perform this action"
      });
    }
    next();
  },
  AuthController.updateUser
);

//delete user
router.delete(
  "/user/:id",
  isAuth.isLoggedIn,
  (req, res, next) => {
    
    const permission = ac.can(req.user).deleteAny("user");
    console.log("Permission", permission.granted);
    console.log(permission.attributes);
    if (!permission.granted) {
      return res.status(401).json({
        error: "You don't have enough permission to perform this action"
      });
    }
    next();
  },
  AuthController.deleteUser
);

router.get("/create", isAuth.isLoggedIn);
module.exports = router;
