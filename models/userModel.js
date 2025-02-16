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
    profile:{
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

module.exports = mongoose.model('user', userSchmea)