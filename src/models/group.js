const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./user')
const Schema = mongoose.Schema;
const groupSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    members:[
        {
            type:Schema.Types.ObjectId,
            ref:'group'
        }
    ],
    active:{
        type:Boolean,
        default:true
    }
})

const Group = mongoose.model('group', groupSchema)

module.exports = Group