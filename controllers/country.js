const Model = require("../models/country");
const { validationResult } = require("express-validator");

exports.addCountry = (req, res, next) => {
  const errors = validationResult(req);
  //if there are errors throw the message Validation failed appended with the errors array to the user
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  } 

  Model.Country.create({
    name: req.body.name,
    code: req.body.code
  })
    .then(res => {
      res.status(201).json({ message: "Country registered Successfully", res });
    })
    .catch(error => {
      console.log(error);
      res.status(422).json(error);
    });
};

exports.getAllCountries = (req, res, next) => {
  Model.Country.findAll()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
};

exports.getOneCountry = (req, res, next) => {
  Model.Country.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        res.send("Country not found! :-(");
      }
      res.json(result);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
};

exports.updateCountry = (req, res, next) => {
  Model.Country.findOne({ where: { id: req.params.id } }).then(
    suggestionInstance => {
      return suggestionInstance
        .update({
          firstName: req.body.firstName,
          lastName: req.body.code
        })
        .then(result => res.json(result))
        .catch(error => res.json(error));
    }
  );
};

exports.deleteCount = (req, res, next) => {
  Model.Country.destroy({ where: { id: req.params.id } })
    .then(result => {
      if (!result) {
        res.send("User not found");
      }
      res.json({ massage: "User deleted successfully" });
    })
    .catch(error => res.json(error));
};
