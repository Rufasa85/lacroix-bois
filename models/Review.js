const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init({
    // add properites here, ex:
    score: {
         type: DataTypes.INTEGER,
         allowNull:false
    }, 
    review: {
        type:DataTypes.TEXT,
        allowNull:false
    }
},{
    sequelize
});

module.exports=Review