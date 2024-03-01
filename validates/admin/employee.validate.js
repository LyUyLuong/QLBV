module.exports.createPost = async (req, res, next) => {
    if (!req.body.HONV) {
        req.flash("error", "Tiêu đề không được để trống!");
        res.redirect("back");
        return;
    }

    if (!req.body.TENLOT) {
        req.flash("error", "Tiêu đề không được để trống!");
        res.redirect("back");
        return;
    }

    if (!req.body.TENNV) {
        req.flash("error", "Tiêu đề không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}