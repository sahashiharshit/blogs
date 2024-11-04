const {Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Blogs = require('./Blogs');

class Comments extends Model{}
Comments.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false,
    },
    commentContent:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    blogId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Blogs,
            key:'id',
        },
    },


},{
    sequelize,
    modelName:'Comments',
    tableName:'comments',
});

module.exports= Comments;