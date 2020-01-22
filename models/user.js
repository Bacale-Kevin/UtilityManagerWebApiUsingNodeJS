const Sequelize = require("sequelize");

const sequelize = require("../server");

//sequelize.define enables us to define a new table
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    timestamp: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: Sequelize.STRING,
  sex: Sequelize.STRING,
  phone: Sequelize.STRING,
  residence: Sequelize.STRING,
  email: Sequelize.STRING,
  role: Sequelize.STRING,
  idCardNumber: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// const createUser = (req, res) => {
//   User.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     sex: req.body.sex,
//     phone: req.body.phone,
//     residence: req.body.residence,
//     email: req.body.email,
//     role: req.body.role,
//     idCardNumber: req.body.idCardNumber
//   })
//     .then(createdUser => res.status(201).json(createdUser))
//     .catch(error => res.json(error));
// };

// const findAllUsers = (req, res) => {
//   User.findAll()
//     .then(listOfUsers => res.status(200).json(listOfUsers))
//     .catch(error => res.json(error));
// };

// const findOneUser = (req, res) => {
//   User.findOne(
//     {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       sex: req.body.sex,
//       phone: req.body.phone,
//       residence: req.body.residence,
//       email: req.body.email,
//       role: req.body.role,
//       idCardNumber: req.body.idCardNumber
//     },
//     { where: { id: req.params.id } }
//   )
//     .then(selectedUser => res.status(200).json(selectedUser))
//     .catch(error => res.json(error));
// };

// const updateUser = (req, res) => {
//   User.update(
//     {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       sex: req.body.sex,
//       phone: req.body.phone,
//       residence: req.body.residence,
//       email: req.body.email,
//       role: req.body.role,
//       idCardNumber: req.body.idCardNumber
//     },
//     { where: { id: req.params.id } }
//   )
//     .then(updatedUserData => {
//       if (!updatedUserData) {
//         return res.status(404).send("User not found!");
//       } else {
//         return res.status(200).json(updatedUserData);
//       }
//     })
//     .catch(error => res.json(error));
// };

// const deleteUser = (req, res) => {
//   User.destroy({
//     where: { id: req.params.id }
//   })
//     .then(destroyUser => {
//       if (!destroyUser) {
//         return res.status(404).send("User not found!");
//       } else {
//         return res.send("User deleted!!!");
//       }
//     })
//     .catch(error => res.json(error));
// };

module.exports = {
  User
  // createUser,
  // findOneUser,
  // findAllUsers,
  // deleteUser,
  // updateUser
};
