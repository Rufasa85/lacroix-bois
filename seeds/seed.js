const sequelize = require("../config/connection")
const {LaCroix,User} = require("../models")
const lacroixData = require("./laCroix.json")
const userData = require("./user.json")

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    await LaCroix.bulkCreate(lacroixData);
    console.log('seeded flavors!')
    await User.bulkCreate(userData);
    console.log('seeded users!')
    process.exit(0);
}

seedMe()