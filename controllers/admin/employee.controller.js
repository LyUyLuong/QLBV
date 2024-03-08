const Employee = require("../../models/employee.model");
const Department = require("../../models/department.model");
const Role = require("../../models/role.model");

const QueryTypes = require('sequelize');
const sequelize = require("../../config/database");
const { Op } = require('sequelize');

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination.helper");
const generateHelper = require("../../helpers/generate");

const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const md5 = require("md5");

// [GET] /admin/employee
module.exports.index = async (req, res) => {
  try {

    const filterState = filterStatusHelper(req.query);
    let objectSearch = searchHelper(req.query, "MANV");

    const find = {
      deleted: false
    };

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
};

// [PATCH] /admin/employee/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {

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

};

// [PATCH] /admin/employee/change-multi
module.exports.changeMulti = async (req, res) => {
  const status = req.body.status;
  const ids = req.body.ids.split(", ");

  console.log(ids)

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
};

// [DELETE] /admin/employee/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    // Sử dụng Sequelize để cập nhật dữ liệu
    await Employee.update(
      { deleted: true, deletedAt: new Date() }, // Dữ liệu cần cập nhật
      { where: { MANV: id } } // Điều kiện để xác định sản phẩm cần cập nhật
    );

    await Account.update(
      { deleted: true }, // Dữ liệu cần cập nhật
      { where: { MANV: id } } // Điều kiện để xác định sản phẩm cần cập nhật
    );

    req.flash('success', 'Xóa thành công');

    // Nếu cần xóa dữ liệu thay vì đánh dấu đã xóa, sử dụng method destroy:
    // await Product.destroy({ where: { id: id } });

  } catch (error) {
    console.log(error);
  }

  // Chuyển hướng người dùng quay lại trang trước đó sau khi xóa thành công
  res.redirect("back");
}

//[GET] /admin/employee/create
module.exports.create = async (req, res) => {

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
    raw: true
  });

  const roles = await Role.findAll({
    raw: true
  });

  // console.log(duties);

  res.render("admin/pages/employee/create", {

    pageTitle: "Thêm mới nhân viên",
    NQL: NQL,
    departments: departments,
    roles: roles
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {

    const countEmployees = await Employee.count() + 1;
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
      MLUONG: req.body.MLUONG,
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

    req.body.role_id = await Role.findOne({
      where: {
        MLUONG: req.body.MLUONG
      },
      attribute: ["id"],
      raw: true
    });

    req.body.password = md5(password);

    // console.log(req.body);

    await Account.create({
      MANV: MANV,
      email: req.body.email,
      password: req.body.password,
      token: req.body.token,
      role_id: req.body.role_id.id,
      deleted: false, // Mặc định không bị xóa
      status: req.body.status || "active", // Mặc định là hoạt động
    });

    req.flash("success", "Thêm mới nhân viên thành công!");

    res.redirect(`/${systemConfig.prefixAdmin}/employee`);
    // res.send("OK")
  } catch (error) {
    console.error("Lỗi khi tạo nhân viên:", error);
    req.flash("error", "Đã xảy ra lỗi khi thêm mới nhân viên!");
    res.redirect(`/${systemConfig.prefixAdmin}/employee/create`);
  }
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {

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
    raw: true
  });

  const roles = await Role.findAll({
    raw: true
  });


  // console.log(employee);

  res.render("admin/pages/employee/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    employee: employee,
    NQL: NQL,
    departments: departments,
    roles: roles
  });
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    // console.log(req.body)

    if (req.file && req.file.filename) {
      req.body.IMAGE = `/uploads/${req.file.filename}`;
      // console.log(req.body.IMAGE)
    }

    await Employee.update(req.body, {
      where: {
        MANV: id
      }
    });

    req.flash("success", "Cập nhật nhân viên thành công!");

    res.redirect("back");
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/employee`);
  }
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
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
}