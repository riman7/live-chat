const mongoose = require('mongoose');
const userSchmea = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    }, 
    image:{
        type:String,
        required: true
    }, 
    password:{
        type:String,
        required: true
    },
    is_online:{
        type:String,
        default: '0'
    }
},
{
    timestamps: true
});

module.exports = mongoose.Model('user', userSchmea)