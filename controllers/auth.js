const Model = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  
  /* Server side validation was been added in the routes folder using express-validator
  so we can extract the validation result using destructuring as shown above in the import ({validationResult})
  we access these result using validationResult(req) as mention below
  having that we can check if there are validation errors and output them to the client
  */
  const errors = validationResult(req);
  //if there are errors throw the message Validation failed appended with the errors array to the user
  if (!errors.isEmpty()) {
   return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }
//If there are no errors proceed to register the user in the the database
//store the password given by the user inthe frontend in the constant called password
  const password = req.body.password;
  //hashing the password in the database
  bcrypt.hash(password, 12).then(hashedPw => {
    accessToken = jwt.sign(
      {
        id: req.body.id 
      },
      "somesupersecretsecret",
      { expiresIn: "1d" } 
    );
//Registring the user in the database with the help of Sequelize our ORM
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
        res.status(201)
        .json({ message: "User registered succesfully", result })
      )
      .catch(error => {
        console.log(error);
        res.status(422).json(error);
      });
  });
};

//Mehtod to login users
exports.loginUser = (req, res, next) => {
  //Taking the email and password and storing it in a these various variable
  const email = req.body.email;
  const password = req.body.password;
  //Checking if the user with the given email is found in the database
  Model.User.findOne({
    where: { email: email }
  })
    .then(user => {
      //If there is no user with the given email return this error message
      if (!user) {
        return res.status(401).send("User with the specified email not found");
      }
      // userloaded receive the user with the correct email
      userLoaded = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        return res.status(401).send("Password is invalid");
      }
      //If the email and password is found in the db return the token
      //if email and password are valid the return the token
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

//Method  to get all the users
exports.getAllUsers = (req, res, next) => {
  Model.User.findAll()
    .then(result => res.json(result))
    .catch(error => res.json(error));
};

//Method to get one user
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
