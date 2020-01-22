const Model = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }
  const password = req.body.password;
  bcrypt.hash(password, 12).then(hashedPw => {
    Model.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sex: req.body.sex,
      phone: req.body.phone,
      residence: req.body.residence,
      email: req.body.email,
      role: req.body.role,
      idCardNumber: req.body.idCardNumber,
      password: hashedPw
    })
      .then(result =>
        res.json({ message: "User registered succesfully", result })
      )
      .catch(error => {
        console.log(error);
        res.status(422).json(error);
      });
  });
};

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Model.User.findOne({
    where: { email: email }
  })
    .then(user => {
      if (!user) {
        return res.status(401).send("User with the specified email not found");
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        return res.status(401).send("Password is invalid");
      }
      //If the email and password is found in the db return the token
      const token = jwt.sign(
        {
          email: loadedUser.email,
          id: loadedUser.id,
          role: loadedUser.role
        },
        "somesupersecretsecret",
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .json({
          id: loadedUser.id,
          email: loadedUser.email,
          role: loadedUser.role,
          token: token
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
};

exports.getAllUsers = (req, res, next) => {
  Model.User.findAll()
    .then(result => res.json(result))
    .catch(error => res.json(error));
};
