const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  try {
    const user = await Account.findOne({
      where: {
        token: req.cookies.token,
        deleted: false,
        status: "active"
      },
      attributes: { exclude: ['password'] }, // Exclude the 'password' field
      raw: true
    });


    if (!user) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
      return;
    }

    const role = await Role.findOne({
      where: {
        id: user.role_id,
        deleted: false
      },
      attributes: ['title','description','permissions'],
      raw: true

    });

    res.locals.user = user;
    res.locals.role = role;
    // console.log(res.locals.role)
    next();
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
  }
}