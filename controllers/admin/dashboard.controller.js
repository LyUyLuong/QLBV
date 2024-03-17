const systemConfig = require("../../config/system");
const Employee = require('../../models/employee.model');
const Department = require('../../models/department.model');
const Location = require('../../models/location.model');
const Project = require('../../models/project.model');


// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {

  const userUsing = await Employee.findOne({
    where:{
      email: res.locals.user.email
    },
    raw: true
  });

  const statistic = {
    employees: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    projects: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    departments: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    locations: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };

    //Count Employees
  statistic.employees.total = await Employee.count({
    where: {
      deleted: false
    }
  });

  statistic.employees.active = await Employee.count({
    where: {
      status: "active",
      deleted: false
    }
  });

  statistic.employees.inactive = await Employee.count({
    where: {
      status: "inactive",
      deleted: false
    }
  });


  //Count Projects
  statistic.projects.total = await Project.count({
    where: {
      deleted: false
    }
  });

  statistic.projects.active = await Project.count({
    where: {
      status: "active",
      deleted: false
    }
  });

  statistic.projects.inactive = await Project.count({
    where: {
      status: "inactive",
      deleted: false
    }
  });


    //Count Departments
  statistic.departments.total = await Department.count({
    where: {
      deleted: false
    }
  });

  statistic.departments.active = await Department.count({
    where: {
      status: "active",
      deleted: false
    }
  });

  statistic.departments.inactive = await Department.count({
    where: {
      status: "inactive",
      deleted: false
    }
  });

  //Count Locations
  statistic.locations.total = await Location.count({
    where: {
      deleted: false
    }
  });

  statistic.locations.active = await Location.count({
    where: {
      status: "active",
      deleted: false
    }
  });

  statistic.locations.inactive = await Location.count({
    where: {
      status: "inactive",
      deleted: false
    }
  });


  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    userUsing: userUsing,
    statistic: statistic
  });
}