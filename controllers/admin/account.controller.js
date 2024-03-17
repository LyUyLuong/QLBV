const md5 = require('md5');
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const generateHelper = require("../../helpers/generate");

const systemConfig = require("../../config/system");
const Employee = require('../../models/employee.model');

const QueryTypes = require('sequelize');
const sequelize = require("../../config/database");
const { Op } = require('sequelize');
const { where } = require('sequelize');

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if(permissions.includes("accounts_view")) {

        // Find
    let find = {
        deleted: false
    };
    // End Find

    const records = await Account.findAll({
        where: find,
        raw: true
    })

    for (const record of records) {
        const role = await Role.findOne({
            where: {
                id: record.role_id
            }
        });
        record.role = role;

        const contact = await Employee.findOne({
            where: {
                MANV: record.MANV
            }
        });
        record.contact = contact;
        // console.log(record.contact.TENNV)

    }

    // console.log(records.MANV)

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records,
    });

    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }
    
        
    
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if(permissions.includes("accounts_view")) {

        const roles = await Role.findAll({
            raw: true
        })
    
        const MANVs = await Employee.findAll({
            where: {
                deleted: false,
                status: "active",
            },// Chỉ lấy trường MANV
            attributes: ['MANV', 'HONV', 'TENLOT', 'TENNV', 'email'],
            raw: true
        })
    
        // console.log(roles);
    
        res.render("admin/pages/accounts/create", {
            pageTitle: "Tạo mới tài khoản",
            MANVs: MANVs,
            roles: roles
        });

    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }

    
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if(permissions.includes("accounts_view")) {

        
    req.body.token = generateHelper.generateRandomString(30);
    req.body.password = md5(req.body.password);

    const record = await Account.create({
        MANV: req.body.MANV,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
        role_id: req.body.role_id,
        deleted: false, // Mặc định không bị xóa
        status: req.body.status || "active", // Mặc định là hoạt động
    });

    // console.log(req.body.password)

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    // res.send("OK")

    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }

};

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if(permissions.includes("accounts_view")) {

        const find = {
            MANV: req.params.id,
            deleted: false,
        };
    
        try {
            const data = await Account.findOne({
                where: find,
                raw: true
            });
    
            const employee = await Employee.findOne({
                where: find,
                attributes: ['MANV', 'HONV', 'TENLOT', 'TENNV', 'email'],
                raw: true
            });
    
            const roles = await Role.findAll({
                where: {
                    deleted: false,
                },
                raw: true
            });
    
            //   console.log(data)
            //   console.log("-------------------------")
            //   console.log(employee)
            //   console.log("-------------------------")
            //   console.log(roles)
    
            res.render("admin/pages/accounts/edit", {
                pageTitle: "Chỉnh sửa tài khoản",
                data: data,
                roles: roles,
                employee: employee
            });
            // res.send("OK");
        } catch (error) {
            res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
            console.log(error)
        }

    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }

    
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {

    const permissions = res.locals.role.permissions;

    if(permissions.includes("accounts_view")) {

        const id = req.params.id;

        // console.log(id)
    
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }
        // console.log(req.body)
        
        // console.log(account)
    
        await Account.update(req.body,{
            where: {
                MANV: id
            }
        });
        req.flash('success', 'Cập nhật thành công');
        
        res.redirect("back");
        // res.send("OK")

    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }



};