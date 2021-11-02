const express = require('express');
const router = express.Router();
const {User,LaCroix,Review}  = require("../../models")

router.get('/',(req,res)=>{
    return res.render("home")
})

router.get("/flavors",(req,res)=>{
    LaCroix.findAll().then(laCroixData=>{
        console.log(laCroixData)
        console.log("=================")
        const hbsLCData = laCroixData.map(item=>item.get({plain:true}))
        console.log(hbsLCData)
        return res.render("flavors/index",{
            flavors:hbsLCData
        })
    })
})


module.exports = router;