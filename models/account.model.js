const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const generate = require("../helpers/generate");

const Account = sequelize.define("account", {
  MANV: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: "nhanvien",
      key: "MANV"
    },
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    default: generate.generateRandomString(30)
  },
  role_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.STRING(20)
  }

}, {
  tableName: 'accounts',
  timestamps: false,
});

module.exports = Account;
