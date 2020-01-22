const Model = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }
  const password = req.body.password;
  bcrypt.hash(password, 12)
  .then(hashedPw => {
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
  })
};

exports.getAllUsers = (req, res, next) => {
  Model.User.findAll()
    .then(result => res.json(result))
    .catch(error => res.json(error));
};

