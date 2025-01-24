const mongoose = require('mongoose');

const chatSchema =  new mongoose.Schema({
    senderId: {
        type: String,
        ref: 'user'
    },
    receiverId: {
        type: String,
        ref: 'user'
    },
    msg: {
        type:String,
            required: true}  
},
{
    timestaps: true
}
);

module.exports = mongoose.model('chat', chatSchema);