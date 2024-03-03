const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const slugify = require("slugify");

const Department = sequelize.define("department", {
    MAKHOA: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    TENKHOA: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    TRPHG: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'nhanvien',
          key: 'MANV'
        }
      },
    NGNC: {
      type: DataTypes.DATE,
      allowNull: true
    },
    NGTL: {
        type: DataTypes.DATE,
        allowNull: false
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
    KHOA_CHA: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'khoa',
        key: 'MAKHOA'
      }
    },
  
  }, {
    tableName: 'khoa',
    timestamps: true,
  });
  
  
  Department.beforeCreate(async (department, options) => {
    // Tạo slug dựa trên tên của nhân viên
    const slug = slugify(`${department.MAKHOA}-${department.TENKHOA}-${Date.now()}`, { lower: true });
    // Gán slug cho trường slug
    department.slug = slug;
  });
  
  module.exports = Department;