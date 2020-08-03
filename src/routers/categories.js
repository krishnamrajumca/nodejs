const express = require('express')
const _ = require('lodash')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Group = require('../models/group')
const Categories = require('../models/categories')
const router = new express.Router()

router.get('/categories',auth, async(req,res)=>{
    const {user} = req;

})
router.post('/categories',auth, async (req,res)=>{
    try{
        const category = await new Categories({name:req.body.name,group:req.user.group_id}).save();
        res.send(category);
    }catch(e){
        res.status(500).send({})
    }
})