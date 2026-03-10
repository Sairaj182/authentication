const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User",
    {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            unique: false, 
            allowNull: true,
        },
        contact: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('SUPER_ADMIN', 'ADMIN', 'USER', 'FACULTY'),
            defaultValue: 'USER',
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tokenVersion: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = User;