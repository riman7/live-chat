const express = require('express');
const http = require('http');
require('dotenv').config();
const ioSocket = require('socket.io');
const mongoose = require('mongoose');
const user = require('./models/userModel');
const chat = require('./models/chatModel')

const app = express();
const server = http.createServer(app);
const io = ioSocket(server);

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

//connecting database
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/live-chat');
}
main().catch(err => console.log(err));

//iosocket
const uns = io.of('/user-namespace');
uns.on('connection', async (socket)=>{
    console.log('user connected');
    var userId = socket.handshake.auth.token;

    //message for all user: broadcast
    socket.broadcast.emit('user-got-online',{userId:userId});

    await user.findByIdAndUpdate({_id: userId}, {$set:{is_online: '1'}});
    socket.on('disconnect',async ()=>{
        console.log('user disconnected');
        await user.findByIdAndUpdate({_id: userId}, {$set:{is_online: '0'}});

        //message for all user: broadcast
        socket.broadcast.emit('user-got-offline',{userId:userId});
    });

    //chat sending and reciving
    socket.on('new-msg-send',(data)=>{
        socket.broadcast.emit('recived-msg-fetch', data);
    });

    //select-chat load old chat
    socket.on('select-chat',async (data)=>{
        console.log(data);
        var chats = await chat.find({$or:[
            { senderId: data.sender_id, receiverId: data.receiver_id },
            { senderId: data.receiver_id, receiverId: data.sender_id }
            ]});
        socket.emit('load-chat', {chats:chats});
    });

});



//for res.render
app.set('view engine', 'ejs');
app.set('views', './views');

server.listen(3000, ()=>{
    console.log('Server is running at 3000');
});