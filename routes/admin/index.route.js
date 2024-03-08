const dashboardRoutes = require("./dashboard.route");
const employeeRoutes = require("./employee.route");
const departmentRoutes = require("./department.route");
const projectRoutes = require("./project.route");
const locationRoutes = require("./location.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");

const systemConfig = require("../../config/system");

module.exports = (app) => {

  const PATH_ADMIN = "/" + systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

  app.use(PATH_ADMIN + "/employee", employeeRoutes);

  app.use(PATH_ADMIN + "/department", departmentRoutes);
  
  app.use(PATH_ADMIN + "/project", projectRoutes);

  app.use(PATH_ADMIN+ "/location", locationRoutes);

  app.use(PATH_ADMIN+ "/roles", roleRoutes);

  app.use(`${PATH_ADMIN}/accounts`, accountRoutes);

}