const Model = require("../models/role");

exports.createRole = (req, res, next) => {
  Model.Role.create({
    name: req.body.name
  })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.getRoles = (req, res, next) => {
  Model.Role.findAll({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => res.status(500).json(error));
};
