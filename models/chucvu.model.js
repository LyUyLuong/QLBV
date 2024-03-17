const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const generate = require("../helpers/generate");
const Employee = require("./employee.model");
const Role = require("./role.model");

const Chucvu = sequelize.define("chucvu", {
  MANV: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: "nhanvien",
      key: "MANV"
    },
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: "role",
      key: "id"
    },
    primaryKey: true,
  }

}, {
  tableName: 'chucvu',
  timestamps: false,
});

module.exports = Chucvu;
