const express = require('express');
const router = express.Router();
const apiRoutes = require("./apiRoutes")


router.use("/api",apiRoutes)
router.get("/",(req,res)=>{
    res.send("hello")
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;