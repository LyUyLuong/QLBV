const dashboardRoutes = require("./dashboard.route");
const employeeRoutes = require("./employee.route");
const departmentRoutes = require("./department.route");
const projectRoutes = require("./project.route");
const locationRoutes = require("./location.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");

const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {

  const PATH_ADMIN = "/" + systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes);

  app.use(PATH_ADMIN + "/employee",authMiddleware.requireAuth, employeeRoutes);

  app.use(PATH_ADMIN + "/department",authMiddleware.requireAuth, departmentRoutes);
  
  app.use(PATH_ADMIN + "/project",authMiddleware.requireAuth, projectRoutes);

  app.use(PATH_ADMIN+ "/location",authMiddleware.requireAuth, locationRoutes);

  app.use(PATH_ADMIN+ "/roles",authMiddleware.requireAuth, roleRoutes);

  app.use(`${PATH_ADMIN}/accounts`,authMiddleware.requireAuth, accountRoutes);

  app.use(`${PATH_ADMIN}/auth`, authRoutes);

  

}