const express = require('express')
const _ = require('lodash')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Group = require('../models/group')
const router = new express.Router()

router.post('/group/create', auth, async (req, res) => {
    try {
       const {user,body} = req;
        console.log(user,body);
        const group = {
            name:body.name,
            members:[user._id],
            active:true
        }
        
        console.log(group)
        const g = await new Group(group).save();
        user.group_id = g._id;
        await new User(user).save();
        res.send(g);
    } catch (e) {
        res.status(500).send({error:"Internal Server"})
    }
})

router.post('/group/join',auth,async(req,res)=>{
    try{
        const {user,body} = req;
        const group = await Group.findById(body.group_id);
        group.members = [...group.members,user];
        user.group_id = body.group_id;

        await group.save();
        
        await new User(user).save();
        res.send(group);

    }catch(e){
        res.status(500).send({error:"Internal Server"});
    }
})
router.delete('/group/leave', auth, async (req,res)=>{
    try{
        const {user} = req;
        const group_id = user.group_id;
        const group = await Group.findById(group_id);
        const {members} = group;
        const index = _.findIndex(members, function(o) { return o._id == user._id; });
        group.members = [...members.slice(0,index),...members.slice(index+1)]
        user.group_id = 0;
        const result = await Promise.all([new Group(group).save(),new User(user).save()]);
        res.send({status:"ok"})
    }
    catch(e){
        res.status(500).send({error:"Internal Server"})
    }
})
module.exports = router