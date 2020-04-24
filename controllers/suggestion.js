const Model = require("../models/suggestion");
const { validationResult } = require("express-validator");

exports.addSuggestion = (req, res, next) => {
  const errors = validationResult(req);
  //if there are errors throw the message Validation failed appended with the errors array to the user
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  Model.Suggestion.create({
    title: req.body.title,
    body: req.body.body,
    userId: req.body.userId
  })
    .then(result => {
      
        res.status(201)
        .json({ message: "Suggestion submitted Successfully", result });
    })
    .catch(error => {
      console.log(error);
      res.status(422).json(error);
    });
};

exports.getSuggestions = (req, res, next) => {
  Model.Suggestion.findAll()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
};

exports.getOneSuggestion = (req, res, next) => {
  Model.Suggestion.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        res.send("Suggestion not found!");
      }
      res.json(result);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
};

exports.updateSuggestion = (req, res, next) => {
  Model.Suggestion.findOne({ where: { id: req.params.id } }).then(
    suggestionInstance => {
      return suggestionInstance
        .update({
          title: req.body.title,
          body: req.body.body
        })
        .then(result => res.json(result))
        .catch(error => res.json(error));
    }
  );
};

exports.deleteSuggestion = (req, res, next) => {
  Model.Suggestion.destroy({ where: { id: req.params.id } })
    .then(result => {
      if (!result) {
        res.send("No suggestion ");
      }
      res.json({ massage: "Suggestion deleted successfully" });
    })
    .catch(error => res.json(error));
};
