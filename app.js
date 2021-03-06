const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./server");
const User = require("./models/user");
const ActivityDomain = require("./models/activityDomain");
const Category = require("./models/category");
const Country = require("./models/country");
const Product = require("./models/product");
const Role = require("./models/role");
const Quarter = require("./models/quarter");
const Resupply = require("./models/resupply");
const Shop = require("./models/shop");
const Stock = require("./models/stock");
const Structure = require("./models/structure");
const Suggestion = require("./models/suggestion");
const Town = require("./models/town");
const Item = require("./models/item");
const AuthRoutes = require("./routes/auth");
const RoleRoutes = require("./routes/role");
const SuggestionRoutes = require("./routes/suggestion");
const CountryRoutes = require("./routes/country");

const app = express();

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", AuthRoutes);
app.use("/role", RoleRoutes);
app.use(CountryRoutes);
app.use(SuggestionRoutes);

Item.Item.belongsTo(Category.Category);
Category.Category.hasMany(Item.Item);
// Category.hasMany(Item, { as: "items", foreignKey: "categoryId" });

Item.Item.belongsTo(User.User);
User.User.hasMany(Item.Item);

Stock.Stock.belongsTo(Item.Item);
Item.Item.hasMany(Stock.Stock);

Stock.Stock.belongsTo(User.User);
User.User.hasMany(Stock.Stock);

Stock.Stock.belongsTo(Shop.Shop);
Shop.Shop.hasMany(Stock.Stock);

Resupply.Resupply.belongsTo(Stock.Stock);
Stock.Stock.hasMany(Resupply.Resupply);

Stock.Stock.belongsToMany(Product.Product, { through: "sales" });
Product.Product.belongsToMany(Stock.Stock, { through: "sales" });

Shop.Shop.belongsTo(Quarter.Quarter);
Quarter.Quarter.hasMany(Shop.Shop);

Shop.Shop.belongsTo(Structure.Structure);
Structure.Structure.hasMany(Shop.Shop);

Town.Town.belongsTo(Country.Country);
Country.Country.hasMany(Town.Town);

Quarter.Quarter.belongsTo(Town.Town);
Town.Town.hasMany(Quarter.Quarter);

Structure.Structure.belongsTo(Quarter.Quarter);
Quarter.Quarter.hasMany(Structure.Structure);

Structure.Structure.belongsTo(User.User);
User.User.hasMany(Structure.Structure);

Structure.Structure.belongsTo(ActivityDomain.ActivityDomain);
ActivityDomain.ActivityDomain.hasMany(Structure.Structure);

Role.Role.belongsToMany(User.User, { through: "userRole" });
User.User.belongsToMany(Role.Role, { through: "userRole" });

Suggestion.Suggestion.belongsTo(User.User);
User.User.hasMany(Suggestion.Suggestion);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => {
    console.log(err);
  });
