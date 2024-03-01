const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const slugify = require("slugify");

const Location = sequelize.define("location", {
    MAKHOA: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: 'khoa',
            key: 'MAKHOA'
        },
        primaryKey: true,
        
    },
    DIADIEM: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
    },
    IMAGE: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    STT: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    tableName: 'diadiemphg',
    timestamps: true,
});


Location.beforeCreate(async (location, options) => {
    // Tạo slug dựa trên tên của nhân viên
    const slug = slugify(`${location.MAKHOA}-${location.DIADIEM}-${Date.now()}`, { lower: true });
    // Gán slug cho trường slug
    location.slug = slug;
});

module.exports = Location;