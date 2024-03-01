const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Duty = sequelize.define("duty", {
  MACV: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  TENCV: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  MLUONG: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20)
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'chucvu',
  timestamps: true,
});

module.exports = Duty;
