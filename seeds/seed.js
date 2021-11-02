const sequelize = require("../config/connection")
const {LaCroix,User,Review} = require("../models")
const lacroixData = require("./laCroix.json")
const userData = require("./user.json")
const reviewData = require("./review.json")

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    const flavors = await LaCroix.bulkCreate(lacroixData);
    console.log('seeded flavors!')
    const users = await User.bulkCreate(userData,{individualHooks:true});
    console.log('seeded users!')
   
    await Review.bulkCreate(reviewData);
    console.log('seeded reviews!')
    process.exit(0);
}

seedMe()