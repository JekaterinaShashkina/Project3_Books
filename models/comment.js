const { DataTypes} = require("sequelize");
const db = require('../config/database'); 

const Comment = db.define("comment", {
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, { tableName: 'comments' });

module.exports = Comment;