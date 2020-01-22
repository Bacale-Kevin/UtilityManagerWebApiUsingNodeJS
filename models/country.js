const Sequelize = require("sequelize");

const sequelize = require("../server");

const Country = sequelize.define("country", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    timestamp: false
  },
  name: Sequelize.STRING,
  code: Sequelize.INTEGER
});

// const getAllCountries = (req, res) => {
//   Country.findAll()
//     .then(countries => {
//       res.json(countries);
//     })
//     .catch(err => console.log(err));
// };

// const getOneCountry = async (req, res) => {
//   try {
//     const countryId = parseInt(req.params.id);
//     const country = await Country.findOne({
//       where: { id: countryId }
//     });
//     if (country) {
//       return res.status(200).json(country);
//     } else if (!country) {
//       return res
//         .status(404)
//         .send("Country with the specified ID does not exists");
//     }
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

// const updateCountry = (req, res) => {
//   // try {
//   //   let countryId = parseInt(req.params.id);
//   //   let country = await Country.update({
//   //     where: { id: countryId }
//   //   });
//   //   if (!country) {
//   //     return res
//   //       .status(404)
//   //       .send("Country with the specified ID does not exists");
//   //   } else if (country) {
//   //     const updatedCountry = await Country.findOne({
//   //       where: { id: countryId }
//   //     });
//   //     return res.status(200).json({ country: updatedCountry });
//   //   }
//   // } catch (error) {
//   //   return console.log(error.message);
//   // }
//   Country.update(
//     { name: req.body.name, code: req.body.code },
//     { where: { id: req.params.id } }
//   )
//     .then(updatedCountry => {
//       res.status(201).json(updatedCountry);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// };

// // const createCountry = (req, res) => {
//   // try {
//   //   const country = await Country.create({
//   //     name: req.body.name,
//   //     code: req.body.code
//   //   });
//   //   if (country) {
//   //     return res.status(201).json({
//   //       country
//   //     });
//   //   }
//   // } catch (error) {
//   //   return res.status(500).json({ error: error.message });
//   // }
//   //*
//   // Country.create({ name: req.body.name, code: req.body.code }).then(
//   //   createdPost => {
//   //     res
//   //       .status(201)
//   //       .json(createdPost)
//   //       .catch(error => {
//   //         res.json(error, req.body.name, req.body.code);
//   //       });
//   //   }
//   // );
// // };

module.exports = {
  Country
  // getAllCountries,
  // getOneCountry,
  // createCountry,
  // updateCountry
};
