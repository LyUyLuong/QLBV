const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
    const records = await Role.findAll({
        where: {
            deleted: false
        }
    })

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Thêm mới Nhóm quyền"
    });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {

    const countRole = await Role.count() + 1;
    const id = "ROLE"+ String(countRole).padStart(4, '0');

    const record = await Role.create({
        id: id,
        title: req.body.title,
        description: req.body.description,
        // permissions: req.body.permissions,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    });;

    req.flash("success", "Tạo nhóm quyền thành công!");

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    // Tự thêm try/catch

    const record = await Role.findOne({
        where: {
            id: req.params.id,
            deleted: false
        }
    })


    res.render("admin/pages/roles/edit", {
        pageTitle: "Chỉnh sửa Nhóm quyền",
        record: record
    });
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    
    // Tự thêm try/catch
    await Role.update(req.body,{
        where: {
            id: req.params.id,
            deleted: false
        }
    });

    req.flash("success", "Cập nhật nhóm quyền thành công!");

    res.redirect(`back`);
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.findAll({
        where: {
            deleted: false
        },
        raw: true

    });
  
    res.render("admin/pages/roles/permissions", {
      pageTitle: "Phân quyền",
      records: records
    });
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    const roles = JSON.parse(req.body.roles);
    
    try {
        for (const item of roles) {
            await Role.update(
                { permissions: item.permissions },
                { where: { id: item.id } }
            );
        }
        req.flash("success", "Cập nhật phân quyền thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật phân quyền không thành công!");
        console.log(error)
    }
  
    res.redirect("back");
}