const express = require('express');
const router = express.Router();
const {LaCroix} = require('../../models');

router.get("/",(req,res)=>{
    LaCroix.findAll().then(laCroixData=>{
        res.json(laCroixData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

module.exports = router;