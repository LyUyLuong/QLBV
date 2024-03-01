const Employee = require("../../models/employee.model");

// [GET] /employee/
module.exports.index = async (req, res) => {
    const employees = await Employee.findAll({
      where: {
        status: "active",
        deleted: false
      },
      order: [
        ['MANV', 'desc'] 
      ],
      raw: true
    });   

    res.render("client/pages/employee/index", {
      pageTitle: "Danh sách nhân viên",
      employees: employees
    });
};
