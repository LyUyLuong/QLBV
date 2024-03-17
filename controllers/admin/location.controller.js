const Employee = require("../../models/employee.model");
const Department = require("../../models/department.model");
const Duty = require("../../models/duty.model");
const Location = require("../../models/location.model");

const QueryTypes = require('sequelize');
const sequelize = require("../../config/database");
const { Op } = require('sequelize');

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination.helper");

const systemConfig = require("../../config/system");

// [GET] /admin/location
module.exports.index = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_view")) {
        try {

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
    
            const filterState = filterStatusHelper(req.query);
            let objectSearch = searchHelper(req.query, "DIADIEM");
    
    
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
                sort["DIADIEM"] = "desc";
            }
    
    
    
            //End Sort
    
            // Tạo thông tin phân trang
            const countLocation = await Location.count({ where: find });
            const objectPagination = paginationHelper(4, req.query, countLocation);
    
            // Lấy danh sách nhân viên với phân trang
            const locations = await Location.findAll({
                where: find,
                order: Object.entries(sort),
                offset: objectPagination.skip,
                limit: objectPagination.limitItems,
                raw: true
            });
    
            const departments = await Department.findAll({
                where: {
                    deleted: false,
                    status: "active"
                },
                raw: true
            })
    
            res.render("admin/pages/location/index", {
                pageTitle: "Danh sách phòng",
                locations: locations,
                filterState: filterState,
                keyword: objectSearch.keyword,
                valueSelecte: objectSearch.valueSelected,
                pagination: objectPagination,
                departments: departments
            });
    
        } catch (error) {
            console.log(error);
            res.redirect(`/${systemConfig.prefixAdmin}/location`);
        }
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }

    
};

// [PATCH] /admin/location/change-status/:status/:id/:dd
module.exports.changeStatus = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_edit")) {
        const id = req.params.id;
        const diadiem = req.params.diadiem; // Update to req.params.diadiem
        const status = req.params.status;
    
        // console.log(id);
        // console.log(diadiem);
        // console.log(status);
    
        await Location.update(
            { status: status },
            { where: { MAKHOA: id, STT: diadiem } } // Update to DIADIEM
        );
    
        req.flash('success', 'Cập nhật trạng thái thành công');
        res.redirect("back");
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }

    
};


// [PATCH] /admin/location/change-multi
module.exports.changeMulti = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_edit")) {

        const status = req.body.status;
    const ids = req.body.ids.split(", ");

    // console.log(status)
    // console.log(ids)

    try {
        switch (status) {
            case "active":
            case "inactive":
                for (const id of ids) {
                    const [MAKHOA, STT] = id.split("-");
                    await Location.update(
                        { status: status },
                        {
                            where: {
                                MAKHOA: MAKHOA,
                                STT: STT
                            }
                        }
                    );
                    // Thực hiện cập nhật dữ liệu tại đây cho mỗi MAKHOA và STT
                }
                req.flash('success', 'Cập nhật trạng thái thành công');
                break;
            case "delete-all":
                // Xóa tất cả các bản ghi có trong danh sách ids
                await Location.update(
                    { deleted: true, deletedAt: new Date() },
                    { where: { MAKHOA: ids } }
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


// [DELETE] /admin/location/delete/:id/:diadiem
module.exports.deleteItem = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_edit")) {

        try {
            const id = req.params.id;
    
            // Sử dụng Sequelize để cập nhật dữ liệu
            await Location.update(
                { deleted: true, deletedAt: new Date() }, // Dữ liệu cần cập nhật
                { where: { MAKHOA: id } } // Điều kiện để xác định sản phẩm cần cập nhật
            );
            req.flash('success', 'Xóa thành công');
            res.redirect("back");
    
        } catch (error) {
            console.log(error);
        }

    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }

   
}

//[GET] /admin/department/create
module.exports.create = async (req, res) => {


    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_create")) {
        try {
            // Lấy danh sách nhân viên quản lý (NQL)
            const NQL = await Employee.findAll({
                attributes: ['MANV', 'HONV', 'TENLOT', 'TENNV'] // Chỉ lấy các trường cần thiết
            });
    
            const departments = await Department.findAll({
                where: {
                    deleted: false,
                    status: "active"
                },
                raw: true
            });
    
            res.render("admin/pages/location/create", {
                pageTitle: "Thêm mới địa điểm",
                NQL: NQL, // Truyền danh sách nhân viên quản lý vào template,
                departments: departments
            });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách phòng:", error);
            res.redirect(`/${systemConfig.prefixAdmin}/location`);
        }
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }
};


// [POST] /admin/departmnet/create
module.exports.createPost = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_create")) {

        try {
            const countLocation = await Department.count() + 1;
    
            if (req.file && req.file.filename) {
                req.body.IMAGE = `/uploads/${req.file.filename}`;
            }
    
            await Location.create({
                MAKHOA: req.body.MAKHOA,
                DIADIEM: req.body.DIADIEM,
                IMAGE: req.body.IMAGE,
                deleted: false,
                status: req.body.status || "active",
                createdAt: new Date(),
                updatedAt: new Date(),
                STT: countLocation
            });
    
            req.flash("success", "Thêm mới địa điểm thành công!");
            res.redirect(`/${systemConfig.prefixAdmin}/location`);
        } catch (error) {
            console.error("Lỗi khi tạo khoa:", error);
            req.flash("error", "Đã xảy ra lỗi khi thêm mới location!");
            res.redirect(`/${systemConfig.prefixAdmin}/location/create`);
        }

    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }
};


// [GET] /admin/department/edit/:id/:diadiem
module.exports.edit = async (req, res) => {


    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_edit")) {
        const id = req.params.id;
        const diadiem = req.params.diadiem;
    
        const location = await Location.findOne({
            where: {
                MAKHOA: id,
                STT: diadiem
            },
            raw: true
    
        });
        const departments = await Department.findAll({
            where: {
                deleted: false,
                status: "active"
            },
            raw: true
        })
    
        res.render("admin/pages/location/edit", {
            pageTitle: "Chỉnh sửa địa điểm phòng",
            location: location,
            departments: departments
        });
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }
};

// [PATCH] /admin/location/edit/:id/:diadiem
module.exports.editPatch = async (req, res) => {


    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_edit")) {
        try {
            const id = req.params.id;
            const diadiem = req.params.diadiem
    
            // console.log(req.body)
    
            if (req.file && req.file.filename) {
                req.body.IMAGE = `/uploads/${req.file.filename}`;
                // console.log(req.body.IMAGE)
            }
    
            await Location.update(req.body, {
                where: {
                    MAKHOA: id,
                    STT: diadiem
                }
            });
    
            // console.log(id)
            // console.log(diadiem)
            // console.log(req.body)
            // res.send("OK")
            req.flash("success", "Cập nhật địa điểm thành công!");
            res.redirect("back");
        } catch (error) {
            res.redirect(`/${systemConfig.prefixAdmin}/location`);
            console.log(error)
        }
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }
    
}

// [GET] /admin/department/detail/:id/:diadiem
module.exports.detail = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if (permissions.includes("location-category_view")) {
        try {
            const id = req.params.id;
            const diadiem = req.params.diadiem
    
            const location = await Location.findOne({
                where: {
                    MAKHOA: id,
                    STT: diadiem
                },
                raw: true
            });
    
            res.render("admin/pages/location/detail", {
                pageTitle: "Chi tiết địa điểm phòng",
                location: location
            });
    
        } catch (error) {
            res.redirect(`/${systemConfig.prefixAdmin}/location`);
            req.flash("error", "Đã xảy ra lỗi khi xem chi tiết địa điểm phòng!");
        }
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }
    
}

