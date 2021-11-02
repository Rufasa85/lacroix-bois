const express = require('express');
const router = express.Router();
const {LaCroix,User} = require('../../models');

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

router.post("/favorite/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({err:"not logged in!"})
    }
    User.findByPk(req.session.user.id).then(loggedInUser=>{
        loggedInUser.addFavorite(req.params.id).then(result=>{
           res.json(result)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({err})
        })
    })
})
router.delete("/favorite/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({err:"not logged in!"})
    }
    User.findByPk(req.session.user.id).then(loggedInUser=>{
        loggedInUser.removeFavorite(req.params.id).then(result=>{
            if(result){
                return res.json(result);
            } else {
                return res.status(404).json({msg:"not favorited"})
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json({err})
        })
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