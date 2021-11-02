const User = require("./User")
const LaCroix = require("./LaCroix")
const Review = require("./Review")

User.hasMany(Review,{
    onDelete:"CASCADE"
});
Review.belongsTo(User);

LaCroix.hasMany(Review, {
    onDelete:"CASCADE"
});
Review.belongsTo(LaCroix);

module.exports ={
    User,
    LaCroix,
    Review
}