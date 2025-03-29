const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcryptjs");

const User = db.define(
    "user",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'users'
    }
);


const DEFAULT_SALT_ROUNDS = 10;

User.addHook("beforeCreate", async (user) => {
  const encryptedPassword = await bcrypt.hash(
    user.password,
    DEFAULT_SALT_ROUNDS
  );
  user.password = encryptedPassword;
});

module.exports = User;
