const Employee = require("../../models/employee.model");
const Department = require("../../models/department.model");
const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const Chucvu = require("../../models/chucvu.model");

const QueryTypes = require('sequelize');
const sequelize = require("../../config/database");
const { Op } = require('sequelize');

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination.helper");
const generateHelper = require("../../helpers/generate");
const createTree = require("../../helpers/createTree");



const systemConfig = require("../../config/system");

const md5 = require("md5");

// [GET] /admin/employee
module.exports.index = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_view")) {

    try {

      // console.log(res.locals.user.MANV)

      const MAKHOAQL = await Employee.findOne({
        where: {
          deleted: false,
          MANV: res.locals.user.MANV
        },
        raw: true,
        attributes: ["MAKHOA"]
      });

      let find;

      if (MAKHOAQL === null) {
        find = {
          deleted: false,
        };
      } else {
        find = {
          deleted: false,
          MAKHOA: MAKHOAQL.MAKHOA
        };
      }

      // console.log(find)



      const filterState = filterStatusHelper(req.query);
      let objectSearch = searchHelper(req.query, "MANV");



      if (req.query.status) {
        find.status = req.query.status;
      }

      if (req.query.keyword && req.query.valueSelected) {
        objectSearch = searchHelper(req.query);
        find[Op.or] = objectSearch[Op.or];

        // console .log(find[Op.or])
      }


      // Sort
      let sort = [];

      if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
      } else {
        sort["MANV"] = "desc";
      }



      //End Sort

      // Tạo thông tin phân trang
      const countEmployees = await Employee.count({ where: find });
      const objectPagination = paginationHelper(4, req.query, countEmployees);

      // Lấy danh sách nhân viên với phân trang
      const employees = await Employee.findAll({
        where: find,
        order: Object.entries(sort),
        offset: objectPagination.skip,
        limit: objectPagination.limitItems,
        raw: true
      });

      const cv = await sequelize.query(
        `SELECT chucvu.MANV, role.title
         FROM chucvu
         JOIN role ON role.id = chucvu.role_id;`,
        {
          type: QueryTypes.SELECT,
        }
      );
      const chucvu = cv[0];

      // console.log(chucvu)

      chucvu.forEach(cv => {
        const matchedEmployee = employees.find(employee => employee.MANV === cv.MANV);
        if (matchedEmployee) {
          matchedEmployee.title = cv.title;
        }
      });

      // console.log(employees)

      res.render("admin/pages/employee/index", {
        pageTitle: "Danh sách nhân viên",
        employees: employees,
        filterState: filterState,
        keyword: objectSearch.keyword,
        valueSelecte: objectSearch.valueSelected,
        pagination: objectPagination
      });

      // console.log(objectSearch.valueSelected);

    } catch (error) {
      console.log(error);
      res.redirect(`/${systemConfig.prefixAdmin}/employee`);
    }

  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }

};

// [PATCH] /admin/employee/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_edit")) {

    const id = req.params.id;
    const status = req.params.status;

    await Employee.update({
      status: status
    }, {
      where: {
        MANV: id
      }
    });

    await Account.update({
      status: status
    }, {
      where: {
        MANV: id
      }
    });


    req.flash('success', 'Cập nhật trạng thái thành công');

    res.redirect("back");
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }

};

// [PATCH] /admin/employee/change-multi
module.exports.changeMulti = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_edit")) {

    const status = req.body.status;
    const ids = req.body.ids.split(", ");

    // console.log(ids)

    try {
      switch (status) {
        case "active":
        case "inactive":
          await Employee.update(
            { status: status },
            { where: { MANV: ids } }
          );

          await Account.update(
            { status: status },
            { where: { MANV: ids } }
          );

          req.flash('success', 'Cập nhật trạng thái thành công');
          break;
        case "delete-all":
          // Xóa tất cả các bản ghi có trong danh sách ids
          await Employee.update(
            { deleted: true, deletedAt: new Date() }, // Dữ liệu cần cập nhật
            { where: { MANV: ids } } // Điều kiện để xác định sản phẩm cần cập nhật
          );

          await Account.update(
            { deleted: true },
            { where: { MANV: ids } }
          );

          req.flash('success', 'Xóa thành công');
          break;
        default:
          throw new Error("Tùy chọn không hợp lệ");
      }

      res.redirect("back");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error.message);
      res.status(500).send("Đã xảy ra lỗi khi cập nhật trạng thái");
    }
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
};

// [DELETE] /admin/employee/delete/:id
module.exports.deleteItem = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_delete")) {

    try {
      const id = req.params.id;

      // Sử dụng Sequelize để cập nhật dữ liệu
      await Employee.update(
        { deleted: true, deletedAt: new Date(), status: "inactive" }, // Dữ liệu cần cập nhật
        { where: { MANV: id } } // Điều kiện để xác định sản phẩm cần cập nhật
      );

      await Account.update(
        { deleted: true },
        { where: { MANV: id } }
      );

      req.flash('success', 'Xóa thành công');

      // Nếu cần xóa dữ liệu thay vì đánh dấu đã xóa, sử dụng method destroy:

    } catch (error) {
      console.log(error);
    }

    // Chuyển hướng người dùng quay lại trang trước đó sau khi xóa thành công
    res.redirect("back");
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
}

//[GET] /admin/employee/create
module.exports.create = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_create")) {

    const MA_NQL = await sequelize.query(`
    SELECT DISTINCT nhanvien.MANV
    FROM nhanvien
    JOIN khoa ON khoa.TRPHG = nhanvien.MANV
  `, {
      type: QueryTypes.SELECT
    });

    const existMA = MA_NQL[0].map(row => row.MANV);

    const NQL = await Employee.findAll({
      where: {
        MANV: existMA
      },
      raw: true
    });

    const departments = await Department.findAll({
      where: {
        deleted: false,
        status: "active"
      },
      raw: true
    });

    const newDepartment = createTree(departments);

    const roles = await Role.findAll({
      where: {
        id: {
          [Op.ne]: 'ROLE0003'
        }
      },
      raw: true
    });

    // console.log(roles);

    res.render("admin/pages/employee/create", {

      pageTitle: "Thêm mới nhân viên",
      NQL: NQL,
      departments: newDepartment,
      roles: roles
    });
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
}

// [POST] /admin/emloyee/create
module.exports.createPost = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_create")) {

    try {

      const countEmployees = await Employee.count() + 1+ generateHelper.generateRandomString(3);;
      const MANV = String(countEmployees).padStart(4, '0');


      if (req.body.MA_NQL == " ") {
        req.body.MA_NQL = null;
      }

      if (req.file && req.file.filename) {
        req.body.IMAGE = `/uploads/${req.file.filename}`;
      }

      // console.log(req.body.MLUONG);

      await Employee.create({
        MANV: MANV,
        HONV: req.body.HONV,
        TENLOT: req.body.TENLOT,
        TENNV: req.body.TENNV,
        NGSINH: req.body.NGSINH,
        PHAI: req.body.PHAI,
        DCHI: req.body.DCHI,
        email: req.body.email,
        MA_NQL: req.body.MA_NQL,
        MAKHOA: req.body.MAKHOA,
        IMAGE: req.body.IMAGE,
        deleted: false, // Mặc định không bị xóa
        status: req.body.status || "active", // Mặc định là hoạt động
        createdAt: new Date(),
        updatedAt: new Date(),
        VAOLAM: new Date()
      });

      req.body.token = generateHelper.generateRandomString(30);

      const password = generateHelper.generateRandomString(10);

      // console.log(req.body)

      // const nv = await Role.findOne({
      //   where: {
      //     id: "ROLE0001"
      //   },
      //   attribute: ["id"],
      //   raw: true
      // });

      // console.log(nv.id)

      req.body.password = (password);

      // console.log(req.body);

      await Account.create({
        MANV: MANV,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
        role_id: req.body.role_id,
        deleted: false, // Mặc định không bị xóa
        status: req.body.status || "active", // Mặc định là hoạt động
      });

      await Chucvu.create({
        MANV: MANV,
        role_id: req.body.role_id
      })

      req.flash("success", "Thêm mới nhân viên thành công!");
      res.redirect(`/${systemConfig.prefixAdmin}/employee`);
      // res.send("OK")
    } catch (error) {
      console.error("Lỗi khi tạo nhân viên:", error);
      req.flash("error", "Đã xảy ra lỗi khi thêm mới nhân viên!");
      res.redirect(`/${systemConfig.prefixAdmin}/employee/create`);
    }
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
};

// [GET] /admin/employee/edit/:id
module.exports.edit = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_edit")) {

    const id = req.params.id;

    const employee = await Employee.findOne({
      where: {
        MANV: id
      },
      raw: true

    });

    const MA_NQL = await sequelize.query(`
    SELECT DISTINCT nhanvien.MANV
    FROM nhanvien
    JOIN khoa ON khoa.TRPHG = nhanvien.MANV
  `, {
      type: QueryTypes.SELECT
    });

    const existMA = MA_NQL[0].map(row => row.MANV);

    const NQL = await Employee.findAll({
      where: {
        MANV: existMA
      },
      raw: true
    });

    const departments = await Department.findAll({
      where: {
        deleted: false,
        status: "active"
      },
      raw: true
    });

    const newDepartment = createTree(departments);

    const roles = await Role.findAll({
      where: {
        id: {
          [Op.ne]: 'ROLE0003'
        }
      },
      raw: true
    });

    const chucvu = await Chucvu.findOne({
      where: {
        MANV: id //employee.MANV
      },
      raw: true
    });

    // console.log(chucvu.role_id)


    // console.log(employee);

    res.render("admin/pages/employee/edit", {
      pageTitle: "Chỉnh sửa nhân viên",
      employee: employee,
      NQL: NQL,
      departments: newDepartment,
      roles: roles,
      chucvu: chucvu
    });

  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
};

// [PATCH] /admin/employee/edit/:id
module.exports.editPatch = async (req, res) => {
  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_edit")) {

    try {
      const id = req.params.id;



      if (req.file && req.file.filename) {
        req.body.IMAGE = `/uploads/${req.file.filename}`;
        // console.log(req.body.IMAGE)
      }

      if (req.body.MA_NQL == " ") {
        req.body.MA_NQL = null;
      }

      await Employee.update(req.body, {
        where: {
          MANV: id
        }
      });


      await Account.update({
        email: req.body.email,
        role_id: req.body.role_id
      }, {
        where: {
          MANV: id
        }
      });

      await Chucvu.update({
        role_id: req.body.role_id
      }, {
        where: {
          MANV: id
        }
      });

      req.flash("success", "Cập nhật nhân viên thành công!");
      res.redirect("back");

      // console.log(req.body);
      // res.send("OK")
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/employee`);
      console.log(error)
    }
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
}

// [GET] /admin/employee/detail/:id
module.exports.detail = async (req, res) => {

  const permissions = res.locals.role.permissions;

  if (permissions.includes("employee-category_view")) {

    try {
      const id = req.params.id;

      const employee = await Employee.findOne({
        where: {
          MANV: id
        },
        raw: true
      });

      if (employee) {
        res.render("admin/pages/employee/detail", {
          pageTitle: "Chi tiết sản phẩm",
          employee: employee
        });
      }
      else {
        res.redirect(`/${systemConfig.prefixAdmin}/employee`);
        req.flash("error", "Đã xảy ra lỗi khi xem chi tiết nhân viên!");
      }
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/employee`);
      req.flash("error", "Đã xảy ra lỗi khi xem chi tiết nhân viên!");
    }

  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }


}