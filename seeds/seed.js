const sequelize = require("../config/connection")
const {LaCroix} = require("../models")
const lacroixData = require("./laCroix.json")

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    await LaCroix.bulkCreate(lacroixData);
    console.log('seeded flavors!')
    process.exit(0);
}

seedMe()