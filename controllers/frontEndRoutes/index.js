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

router.get("/flavors/:id",(req,res)=>{
    LaCroix.findByPk(req.params.id,{
        include:[{
            model:Review,
            include:[User]
        }]
    }).then(laCroixData=>{
        const hbsData = laCroixData.get({plain:true})
        console.log(hbsData);
        res.render("flavors/single",hbsData);
    })
})
router.get("/profile/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[{
            model:Review,
            include:[LaCroix]
        }]
    }).then(userData=>{
        const hbsData = userData.get({plain:true})
        console.log(hbsData);
        res.render("profile",hbsData);
    })
})


module.exports = router;