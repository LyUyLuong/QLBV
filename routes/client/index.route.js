const homeRoutes = require("./home.route");
const employeeRoutes = require("./employee.route");

module.exports = (app) => {
  app.use("/", homeRoutes);

  app.use("/employee", employeeRoutes);
}