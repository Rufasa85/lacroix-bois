const express = require('express');
const router = express.Router();
const laCroixRoutes = require("./laCroixRoutes");
const userRoutes = require("./userRoutes");
const reviewRoutes = require("./reviewRoutes");


router.use("/lacroix",laCroixRoutes);
router.use("/users",userRoutes);
router.use("/reviews",reviewRoutes);
router.get("/",(req,res)=>{
    res.send("hello from api!")
})

module.exports = router;