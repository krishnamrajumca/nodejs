const mongoose = require('mongoose');
const Group = require('./group');
const Schema = mongoose.Schema
const CategoriesSchema = Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    group:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'group'
    }
})


const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;