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
    accessToken = jwt.sign(
      {
        id: req.body.id
      },
      "somesupersecretsecret",
      { expiresIn: "1d" }
    );

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
      userLoaded = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        return res.status(401).send("Password is invalid");
      }
      //If the email and password is found in the db return the token
      const token = jwt.sign(
        {
          id: userLoaded.id,
          role: userLoaded.role,
          email: userLoaded.email
        },
        "somesupersecretsecret",
        { expiresIn: "1d" }
      );

      res.status(200).json({
        token: token,
        id: userLoaded.id,
        role: userLoaded.role
      });
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
};

exports.getAllUsers = (req, res, next) => {
  Model.User.findAll()
    .then(result => res.json(result))
    .catch(error => res.json(error));
};

exports.getOneUser = (req, res, next) => {
  Model.User.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        res.send("User not found! :-(");
      }
      res.json(result);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
};

exports.updateUser = (req, res, next) => {
  Model.User.findOne({ where: { id: req.params.id } }).then(
    suggestionInstance => {
      return suggestionInstance
        .update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          sex: req.body.sex,
          phone: req.body.phone,
          residence: req.body.residence,
          email: req.body.email,
          role: req.body.role,
          idCardNumber: req.body.idCardNumber,
          password: req.body.password
        })
        .then(result => res.json(result))
        .catch(error => res.json(error));
    }
  );
};

exports.deleteUser = (req, res, next) => {
  Model.User.destroy({ where: { id: req.params.id } })
    .then(result => {
      if (!result) {
        res.send("User not found");
      }
      res.json({massage: "User deleted successfully"})
    })
    .catch(error => res.json(error));
};
