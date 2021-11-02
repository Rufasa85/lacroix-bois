const express = require('express');
const router = express.Router();
const laCroixRoutes = require("./laCroixRoutes");

router.use("/lacroix",laCroixRoutes);
router.get("/",(req,res)=>{
    res.send("hello from api!")
})

module.exports = router;