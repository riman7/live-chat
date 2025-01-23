const express = require('express');
const http = require('http');
require('dotenv').config();
const ioSocket = require('socket.io');
const mongoose = require('mongoose');
const user = require('./models/userModel');

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
    console.log(socket);
    var senderId = socket.handshake.auth.token;
    await user.findByIdAndUpdate({_id: senderId}, {$set:{is_online: '1'}});
    socket.on('disconnect',async ()=>{
        console.log('user disconnected');
        await user.findByIdAndUpdate({_id: senderId}, {$set:{is_online: '0'}});
    })
});
//for res.render
app.set('view engine', 'ejs');
app.set('views', './views');


server.listen(3000, ()=>{
    console.log('Server is running at 3000');
});