const Employee = require("../../models/employee.model");
const Department = require("../../models/department.model");
const Duty = require("../../models/duty.model");
const Project = require("../../models/project.model");
const Phancong = require("../../models/phancong.model");

const QueryTypes = require('sequelize');
const sequelize = require("../../config/database");
const { Op } = require('sequelize');

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination.helper");

const systemConfig = require("../../config/system");

// [GET] /admin/project
module.exports.index = async (req, res) => {
    try {

        const filterState = filterStatusHelper(req.query);
        let objectSearch = searchHelper(req.query, "TENDA");

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
            sort["TENDA"] = "desc";
          }
      
      
      
          //End Sort

        // Tạo thông tin phân trang
        const countProject = await Project.count({ where: find });
        const objectPagination = paginationHelper(4, req.query, countProject);

        // Lấy danh sách nhân viên với phân trang
        const projects = await Project.findAll({
            where: find,
            order: Object.entries(sort),
            offset: objectPagination.skip,
            limit: objectPagination.limitItems,
            raw: true
        });

        res.render("admin/pages/project/index", {
            pageTitle: "Danh sách đề án",
            projects: projects,
            filterState: filterState,
            keyword: objectSearch.keyword,
            valueSelecte: objectSearch.valueSelected,
            pagination: objectPagination
        });

    } catch (error) {
        console.log(error);
        res.redirect(`/${systemConfig.prefixAdmin}/project`);
    }
};

// [PATCH] /admin/project/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {

    const id = req.params.id;
    const status = req.params.status;

    if (status == "active") {
        await Project.update({
            status: status,
            NGAYKT: null
        }, {
            where: {
                MADA: id
            }
        });
    }
    else if (status == "inactive") {
        await Project.update({
            status: status,
            NGAYKT: new Date()
        }, {
            where: {
                MADA: id
            }
        });
    }

    // await Project.update({
    //     status: status
    //     // NGAYKT: null
    // }, {
    //     where: {
    //         MADA: id
    //     }
    // });



    req.flash('success', 'Cập nhật trạng thái thành công');

    res.redirect("back");

};

// [PATCH] /admin/project/change-multi
module.exports.changeMulti = async (req, res) => {
    const status = req.body.status;
    const ids = req.body.ids.split(", ");

    try {
        switch (status) {
            case "active":
                await Project.update(
                    {
                        status: status,
                        NGAYKT: null
                    },
                    { where: { MADA: ids } }
                );
                req.flash('success', 'Cập nhật trạng thái thành công');
                break;
            case "inactive":
                await Project.update(
                    { 
                        status: status,
                        NGAYKT: new Date()
                    },
                    { where: { MADA: ids } }
                );
                req.flash('success', 'Cập nhật trạng thái thành công');
                break;
            case "delete-all":
                // Xóa tất cả các bản ghi có trong danh sách ids
                await Project.update(
                    { deleted: true, deletedAt: new Date() }, // Dữ liệu cần cập nhật
                    { where: { MADA: ids } } // Điều kiện để xác định sản phẩm cần cập nhật
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


// [DELETE] /admin/project/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;

        // Sử dụng Sequelize để cập nhật dữ liệu
        await Project.update(
            { deleted: true, deletedAt: new Date() }, // Dữ liệu cần cập nhật
            { where: { MADA: id } } // Điều kiện để xác định sản phẩm cần cập nhật
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

//[GET] /admin/project/create
module.exports.create = async (req, res) => {
    try {
        // Lấy danh sách nhân viên quản lý (NQL)
        const employees = await Employee.findAll({
            raw: true // Chỉ lấy các trường cần thiết
        });

        //Lấy ra các khoa để cho người dùng lựa chọn
        const departments = await Department.findAll({
            raw: true
        });

        res.render("admin/pages/project/create", {
            pageTitle: "Thêm mới đề án",
            departments: departments,
            employees: employees
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đề án:", error);
        res.redirect(`/${systemConfig.prefixAdmin}/project`);
    }
}


// [POST] /admin/project/create
module.exports.createPost = async (req, res) => {
    try {
        const countProjects = await Project.count() + 1;
        const MADA = String(countProjects).padStart(4, '0');

        // Kiểm tra xem ngày nhận chức có được gán giá trị không

        if (req.file && req.file.filename) {
            req.body.IMAGE = `/uploads/${req.file.filename}`;
        }



        const newProject = await Project.create({
            MADA: MADA,
            TENDA: req.body.TENDA,
            DDIEM_DA: req.body.DDIEM_DA,
            NGAYBD: req.body.NGAYBD,
            NGAYKT: req.body.NGAYKT,
            MAKHOA: req.body.MAKHOA,
            IMAGE: req.body.IMAGE,
            deleted: false,
            status: req.body.status || "active",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const MANVTG = req.body.MANV;

        MANVTG.forEach(async nv => {
           await Phancong.create({
                MANV: nv,
                MADA: MADA,
                status: req.body.status || "active",
            });

        });


        req.flash("success", "Thêm mới đề án thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/project`);
    } catch (error) {
        console.error("Lỗi khi tạo khoa:", error);
        req.flash("error", "Đã xảy ra lỗi khi thêm mới đề án!");
        res.redirect(`/${systemConfig.prefixAdmin}/project/create`);
    }
};


// [GET] /admin/project/edit/:id
module.exports.edit = async (req, res) => {

    const id = req.params.id;

    const project = await Project.findOne({
        where: {
            MADA: id
        },
        raw: true

    });

    const departments = await Department.findAll({
        where: {

        },
        raw: true
    });

    res.render("admin/pages/project/edit", {
        pageTitle: "Chỉnh sửa đề án",
        project: project,
        departments: departments
    });
};

// [PATCH] /admin/project/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        // console.log(req.body)

        if (req.file && req.file.filename) {
            req.body.IMAGE = `/uploads/${req.file.filename}`;
        }

        if(req.body.NGAYKT == "") {
            req.body.NGAYKT= null;
        }

        await Project.update(req.body,{
            where: {
                MADA: id
            }
        });

        req.flash("success", "Cập nhật đề án thành công!");

        res.redirect("back");
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/project`);
    }
}

// [GET] /admin/project/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const project = await Project.findOne({
            where: {
                MADA: id
            },
            raw: true
        });

        if (project) {
            res.render("admin/pages/project/detail", {
                pageTitle: "Chi tiết đề án",
                project: project
            });
        }
        else {
            res.redirect(`/${systemConfig.prefixAdmin}/project`);
            req.flash("error", "Đã xảy ra lỗi khi xem chi tiết đề án!");
        }
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/project`);
        req.flash("error", "Đã xảy ra lỗi khi xem chi tiết đề án!");
    }
}

