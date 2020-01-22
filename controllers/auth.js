const Model = require("../models/user");

exports.signUp = (req, res, next) => {
  Model.User.create({
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
    .then(result =>
      res.json({ message: "User registered succesfully", result })
    )
    .catch(error => {
      console.log(error);
      res.status(422).json(error);
    });
};

exports.getAllUsers = (req, res, next) => {
  Model.User.findAll()
    .then(result => res.json(result))
    .catch(error => res.json(error));
};
