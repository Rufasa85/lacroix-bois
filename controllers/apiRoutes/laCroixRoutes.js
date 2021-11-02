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

router.get("/:id",(req,res)=>{
    LaCroix.findByPk(req.params.id).then(singleCroix=>{
        if(singleCroix){
            res.json(singleCroix)
        } else {
            res.status(404).json({err:"no such flavor found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.post("/",(req,res)=>{
    LaCroix.create({
        flavor:req.body.flavor,
        image:req.body.image
    }).then(newLacroix=>{
        res.json(newLacroix)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.put("/:id",(req,res)=>{
    LaCroix.update({
        flavor:req.body.flavor,
        image:req.body.image
    },{
        where:{
            id:req.params.id
        }
    }).then(updatedData=>{
        if(updatedData[0]){
            res.json(updatedData)
        } else {
            res.status(404).json({err:"no such flavor found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.delete("/:id",(req,res)=>{
    LaCroix.destroy({
        where:{
            id:req.params.id
        }
    }).then(deletedLacroix=>{
        if(deletedLacroix){
            res.json(deletedLacroix)
        } else {
            res.status(404).json({err:"no such flavor found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

module.exports = router;