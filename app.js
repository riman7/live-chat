const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const ioSocket = require('socket.io');
const mongoose = require('mongoose');

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


app.set('view engine', 'ejs');
app.set('views', './views');


server.listen(3000, ()=>{
    console.log('Server is running at 3000');
});