const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Phancong = sequelize.define("phancong", {
    MANV: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    MADA: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    THOIGIAN: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: DataTypes.DATE,
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
    tableName: 'phancong',
    timestamps: true,
});


module.exports = Phancong;