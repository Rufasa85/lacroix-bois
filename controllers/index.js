const express = require('express');
const router = express.Router();
const apiRoutes = require("./apiRoutes")


router.use("/api",apiRoutes)
router.get("/",(req,res)=>{
    res.send("hello")
})

module.exports = router;