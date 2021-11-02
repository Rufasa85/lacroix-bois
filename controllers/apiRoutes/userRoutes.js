const express = require('express');
const router = express.Router();
const {User} = require('../../models');

router.get("/",(req,res)=>{
    User.findAll().then(UserData=>{
        res.json(UserData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id).then(singleUser=>{
        if(singleUser){
            res.json(singleUser)
        } else {
            res.status(404).json({err:"no such user found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.post("/",(req,res)=>{
    User.create({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    }).then(newUser=>{
        res.json(newUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.put("/:id",(req,res)=>{
    User.update({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    },{
        where:{
            id:req.params.id
        }
    }).then(updatedData=>{
        if(updatedData[0]){
            res.json(updatedData)
        } else {
            res.status(404).json({err:"no such user found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.delete("/:id",(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(deletedUser=>{
        if(deletedUser){
            res.json(deletedUser)
        } else {
            res.status(404).json({err:"no such user found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

module.exports = router;