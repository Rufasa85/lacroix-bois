const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LaCroix extends Model {}

LaCroix.init({
    // add properites here, ex:
    flavor: {
         type: DataTypes.STRING,
         unique:true
    },
    image: {
        type: DataTypes.STRING,
        unique:true
   }
},{
    sequelize
});

module.exports=LaCroix