const Sequelize = require("sequelize");

const sequelize = require("../server");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

// const createCategory = (req, res) => {
//   Category.create({ name: req.body.name })
//     .then(category => {
//       res.status(201).json(category);
//     })
//     .catch(error => {
//       res.json(error, req.body.name);
//     });
// };

// const showAllCategories = (req, res) => {
//   Category.findAll().then(result => {
//     res.json(result).catch(error => {
//       res.json(error);
//     });
//   });
// };

// const getOneCategory = (req, res) => {
//   let id = parseInt(req.params.id);
//   Category.findOne({ where: { id: id } })
//     .then(result => res.json(result))
//     .catch(error => {
//       res.json(error);
//     });
// };

// const updateCategory = (req, res) => {
//   Category.update({ name: req.body.name }, { where: { id: req.params.id } })
//     .then(updatedCategory => res.status(200).json(updatedCategory))
//     .catch(error => res.json(error));
// };

// const deleteCategory = (req, res) => {
//   Category.destroy({ where: { id: req.params.id } })
//     .then(category => {
//       if (!category) {
//         return res.status(404).send("404 Category not found :(");
//       }
//       return category
//         .update({
//           name: req.body.name || category.name
//         })
//         .then(() => res.status(200).json(category))
//         .catch(error => res.json(error));
//     })
//     .catch(error => res.json(error));
// };

module.exports = {
  Category
  // createCategory,
  // showAllCategories,
  // getOneCategory,
  // updateCategory,
  // deleteCategory
};
