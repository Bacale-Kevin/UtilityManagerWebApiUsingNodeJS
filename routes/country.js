const express = require("express");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator");
const CountryController = require("../controllers/country");
const accessControl = require("accesscontrol");


const router = express.Router();


const ac = new accessControl();

ac.grant("seller")

ac.grant("manager")
  .extend("seller")
  .readAny("user")
  .updateAny('user')
  .delete('user')

ac.grant("admin")

router.post(
  "/country",
  [body("name").notEmpty()],
  isAuth.isLoggedIn,
  CountryController.addCountry
);

router.get("/country/:id", isAuth.isLoggedIn, CountryController.getOneCountry);

router.get("/countries",  CountryController.getAllCountries);

router.delete("/country", isAuth.isLoggedIn, CountryController.deleteCount);

router.put("/country", isAuth.isLoggedIn, CountryController.updateCountry);

module.exports = router;
