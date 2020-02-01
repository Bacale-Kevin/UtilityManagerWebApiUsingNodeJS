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
  .readOwn("user", ["*", "!id"])
  .updateOwn("user");

ac.grant("manager")
  .extend("seller")
  .readAny("user");

ac.grant("admin")
  .extend("seller")
  .extend("manager")
  .updateAny("user")
  .deleteAny("user");

router.post(
  "/signup",
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
      .isEmail()
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
      .notEmpty()
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
    body("sex")
      .trim()
      .notEmpty(),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
  ],
  AuthController.signUp
);

router.post("/login", AuthController.loginUser);

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
router.put(
  "/users/:id",
  isAuth.isLoggedIn,
  isAuth.grantAccess("updateAny", "user"),
  AuthController.updateUser
);
router.delete(
  "/users/:id",
  isAuth.isLoggedIn,
  isAuth.grantAccess("deleteAny", "user"),
  AuthController.deleteUser
);

router.get("/create", isAuth.isLoggedIn);
module.exports = router;
