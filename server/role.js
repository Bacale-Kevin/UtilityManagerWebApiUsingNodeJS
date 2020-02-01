const accessControl = require("accesscontrol");

module.exports = () => {
  const ac = new accessControl();

  ac.grant("seller")
    .readOwn("user")
    .updateOnly("user");

  ac.grant("manager")
    .extends("seller")
    .readAny("user");

  ac.grant("admin")
    .extends("seller")
    .extends("manager")
    .updateAny("user")
    .deleteAny("user");

    // const permission = ac.can('seller').readOwn('user');
    // console.log(permission.granted);    // —> true
    // console.log(permission.attributes);

    // const permission = ac.can('manager').readAny('user');
    // console.log(permission.granted);    // —> true
    // console.log(permission.attributes);

    // const permission = ac.can('admin').updateAny('user').deleteAny('user');
    // console.log(permission.granted);    // —> true
    // console.log(permission.attributes);
};

// const ac = new accessControl();

// exports.roles = (function() {
//   ac.grant("seller")
//     .readOwn("user")
//     .updateOnly("user");

//   ac.grant("manager")
//     .extends("seller")
//     .readAny("user");

//   ac.grant("admin")
//     .extends("seller")
//     .extends("manager")
//     .updateAny("user")
//     .deleteAny("user");

//   return ac;
// });
