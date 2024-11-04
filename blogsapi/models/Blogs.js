const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/db');

class Blogs extends Model {}
Blogs.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    blogTitle:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    blogAuthor:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    blogContent:{
        type:DataTypes.TEXT,
        allowNull:false,
    },

},
{
    sequelize,
    modelName:'Blogs',
    tableName:'blogs',
}
);
module.exports=Blogs;