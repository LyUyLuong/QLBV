const Employee = require("../../models/employee.model");
const Department = require("../../models/department.model");
const Duty = require("../../models/duty.model");

const QueryTypes = require('sequelize');
const sequelize = require("../../config/database");
const { Op } = require('sequelize');

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination.helper");

const systemConfig = require("../../config/system");

// [GET] /admin/department
module.exports.index = async (req, res) => {
    try {

        const filterState = filterStatusHelper(req.query);
        let objectSearch = searchHelper(req.query, "TENKHOA");

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
            sort["MAKHOA"] = "desc";
        }



        //End Sort


        // Tạo thông tin phân trang
        const countDepartment = await Department.count({ where: find });
        const objectPagination = paginationHelper(4, req.query, countDepartment);

        // Lấy danh sách nhân viên với phân trang
        const departments = await Department.findAll({
            where: find,
            order: Object.entries(sort),
            offset: objectPagination.skip,
            limit: objectPagination.limitItems,
            raw: true
        });

        res.render("admin/pages/department/index", {
            pageTitle: "Danh sách khoa",
            departments: departments,
            filterState: filterState,
            keyword: objectSearch.keyword,
            valueSelecte: objectSearch.valueSelected,
            pagination: objectPagination
        });

    } catch (error) {
        console.log(error);
        res.redirect(`/${systemConfig.prefixAdmin}/department`);
    }
};

// [PATCH] /admin/department/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {

    const id = req.params.id;
    const status = req.params.status;

    await Department.update({
        status: status
    }, {
        where: {
            MAKHOA: id
        }
    });

    req.flash('success', 'Cập nhật trạng thái thành công');

    res.redirect("back");

};

// [PATCH] /admin/department/change-multi
module.exports.changeMulti = async (req, res) => {
    const status = req.body.status;
    const ids = req.body.ids.split(", ");

    try {
        switch (status) {
            case "active":
            case "inactive":
                await Department.update(
                    { status: status },
                    { where: { MAKHOA: ids } }
                );
                req.flash('success', 'Cập nhật trạng thái thành công');
                break;
            case "delete-all":
                // Xóa tất cả các bản ghi có trong danh sách ids
                await Department.update(
                    { deleted: true, deletedAt: new Date() }, // Dữ liệu cần cập nhật
                    { where: { MAKHOA: ids } } // Điều kiện để xác định sản phẩm cần cập nhật
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


// [DELETE] /admin/department/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;

        // Sử dụng Sequelize để cập nhật dữ liệu
        await Department.update(
            { deleted: true, deletedAt: new Date() }, // Dữ liệu cần cập nhật
            { where: { MAKHOA: id } } // Điều kiện để xác định sản phẩm cần cập nhật
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

//[GET] /admin/department/create
module.exports.create = async (req, res) => {
    try {
        // Lấy danh sách nhân viên quản lý (NQL)
        const NQL = await Employee.findAll({
            attributes: ['MANV', 'HONV', 'TENLOT', 'TENNV'] // Chỉ lấy các trường cần thiết
        });

        res.render("admin/pages/department/create", {
            pageTitle: "Thêm mới khoa",
            NQL: NQL // Truyền danh sách nhân viên quản lý vào template
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên quản lý:", error);
        res.redirect(`/${systemConfig.prefixAdmin}/department`);
    }
}

// [POST] /admin/departmnet/create
module.exports.createPost = async (req, res) => {
    try {
        const countDepartments = await Department.count() + 1;
        const MAKHOA = String(countDepartments).padStart(4, '0');

        // Kiểm tra xem ngày nhận chức có được gán giá trị không
        let NGNC = req.body.NGNC ? req.body.NGNC : null;

        // Kiểm tra xem trưởng phòng có được gán giá trị không
        let TRPHG = req.body.TRPHG ? req.body.TRPHG : null;

        if (req.file && req.file.filename) {
            req.body.IMAGE = `/uploads/${req.file.filename}`;
        }

        const newDepartment = await Department.create({
            MAKHOA: MAKHOA,
            TENKHOA: req.body.TENKHOA,
            TRPHG: TRPHG,
            NGNC: NGNC,
            NGTL: req.body.NGTL,
            IMAGE: req.body.IMAGE,
            deleted: false,
            status: req.body.status || "active",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        req.flash("success", "Thêm mới khoa thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/department`);
    } catch (error) {
        console.error("Lỗi khi tạo khoa:", error);
        req.flash("error", "Đã xảy ra lỗi khi thêm mới khoa!");
        res.redirect(`/${systemConfig.prefixAdmin}/department/create`);
    }
};

// [GET] /admin/department/edit/:id
module.exports.edit = async (req, res) => {

    const id = req.params.id;

    const department = await Department.findOne({
        where: {
            MAKHOA: id
        },
        raw: true

    });

    const NQL = await Employee.findAll({
        attributes: ['MANV', 'HONV', 'TENLOT', 'TENNV'] // Chỉ lấy các trường cần thiết
    });

    res.render("admin/pages/department/edit", {
        pageTitle: "Chỉnh sửa khoa",
        department: department,
        NQL: NQL
    });
};

// [PATCH] /admin/department/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        // console.log(req.body)

        if (req.file && req.file.filename) {
            req.body.IMAGE = `/uploads/${req.file.filename}`;
            // console.log(req.body.IMAGE)
        }

        await Department.update(req.body, {
            where: {
                MAKHOA: id
            }
        });

        req.flash("success", "Cập nhật khoa thành công!");

        res.redirect("back");
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/department`);
    }
}

// [GET] /admin/department/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const department = await Department.findOne({
            where: {
                MAKHOA: id
            },
            raw: true
        });

        if (department) {
            res.render("admin/pages/department/detail", {
                pageTitle: "Chi tiết khoa",
                department: department
            });
        }
        else {
            res.redirect(`/${systemConfig.prefixAdmin}/department`);
            req.flash("error", "Đã xảy ra lỗi khi xem chi tiết khoa!");
        }
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/department`);
        req.flash("error", "Đã xảy ra lỗi khi xem chi tiết khoa!");
    }
}

