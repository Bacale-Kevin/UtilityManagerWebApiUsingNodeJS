const express = require("express");
const AuthController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", AuthController.signUp);

router.get("/users", AuthController.getAllUsers);

module.exports = router;
