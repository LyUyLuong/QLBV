const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const slugify = require("slugify");

const Project = sequelize.define("project", {
    MADA: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    TENDA: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    DDIEM_DA: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    MAKHOA: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: 'khoa',
            key: 'MAKHOA'
        }
    },
    NGAYBD: {
        type: DataTypes.DATE,
        allowNull: false
    },
    NGAYKT: {
        type: DataTypes.DATE,
        allowNull: true
    },
    IMAGE: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(20)
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }

}, {
    tableName: 'dean',
    timestamps: true,
});


Project.beforeCreate(async (project, options) => {
    // Tạo slug dựa trên tên của nhân viên
    const slug = slugify(`${project.MADA}-${project.TENDA}-${Date.now()}`, { lower: true });
    // Gán slug cho trường slug
    project.slug = slug;
});

module.exports = Project;