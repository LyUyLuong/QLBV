const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const slugify = require("slugify");

const Employee = sequelize.define("employee", {
  MANV: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  HONV: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  TENLOT: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  TENNV: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  NGSINH: {
    type: DataTypes.DATE,
  },
  PHAI: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  DCHI: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  MA_NQL: {
    type: DataTypes.STRING(255),
    allowNull: true,
    references: {
      model: "nhanvien",
      key: "MANV"
    }
  },
  MAKHOA: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: 'khoa',
      key: 'MAKHOA'
    }
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
  },
  VAOLAM:{
    type: DataTypes.DATE,
  }

}, {
  tableName: 'nhanvien',
  timestamps: true,
});


Employee.beforeCreate(async (employee, options) => {
  // Tạo slug dựa trên tên của nhân viên
  const slug = slugify(`${employee.HONV}-${employee.TENLOT}-${employee.TENNV}-${Date.now()}`, { lower: true });
  // Gán slug cho trường slug
  employee.slug = slug;
});

module.exports = Employee;
