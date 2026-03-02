const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User",
    {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
            type: DataTypes.ENUM('SUPER_ADMIN', 'ADMIN', 'USER'),
            defaultValue: 'USER',
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tokenVersion: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

module.exports = User;