const express = require("express");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator");
const accessControl = require("accesscontrol");
const SuggestionController = require("../controllers/suggestion");

const router = express.Router();

const ac = new accessControl();

ac.grant("seller");

ac.grant("manager")
  .extend("seller")
  .readAny("suggestion")
  .delete("suggestion");

router.post(
  "/suggestion",
  [
    body("title").notEmpty(),
    body("body")
      .notEmpty()
      .trim(),
    body("userId")
      .notEmpty()
      .trim()
  ],
  isAuth.isLoggedIn,
  SuggestionController.addSuggestion
);

router.get(
  "/suggestions",
  isAuth.isLoggedIn,
  (req, res, next) => {
    const permission = ac.can(req.user).readOwn("suggestion");
    console.log("Permission", permission.granted);
    console.log(permission.attributes);
    if (!permission.granted) {
      return res.status(401).json({
        error: "You don't have enough permission to perform this action"
      });
    }
    next();
  },
  SuggestionController.getSuggestions
);

router.get(
  "/suggestion/:id",
  isAuth.isLoggedIn,
  SuggestionController.getOneSuggestion
);

router.delete(
  "/suggestion/:id",
  isAuth.isLoggedIn,
  SuggestionController.deleteSuggestion
);

module.exports = router;
