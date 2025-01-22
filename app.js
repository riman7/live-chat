const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const ioSocket = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = ioSocket(server);

//connecting database
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
main().catch(err => console.log(err));

server.listen(3000, ()=>{
    console.log('Server is running at 3000');
});