const mongoose = require('mongoose');

const chatSchema =  new mongoose.Schema({
    senderId: {type: string,
        ref: 'user'
    },
    reciverId: {type: string,
        ref: 'user'
    },
    msg: {type:string, required: true}  
},
{
    timestaps: true
}
)