const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const chatModel = require('../models/chatModel');

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data')

const imgbbApiKey = process.env.imgbb_api;

const registerLoad = async (req, res) => {
    try {
        res.render('register')
    }
    catch (err) {
        console.log(err);
    }
}



const register = async (req, res) => {
    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        const filePath = req.file.path;
        console.log(req.file)
        //const imagePath = path.join(__dirname, 'public', 'images', 'favicon.png');

        const uploadImage = async () => {
            try {
                // Read the image file
                const image = fs.readFileSync(filePath);
        
                // Set up the form data for Imgbb API
                const formData = new FormData();
                formData.append('image', image, req.file.filename);
        
                // Send POST request to Imgbb
                const response = await axios.post('https://api.imgbb.com/1/upload?key=' + imgbbApiKey, formData, {
                    headers: {
                        ...formData.getHeaders(),
                    },
                });
                // Log the response from Imgbb
                console.log('Image uploaded successfully:');
                return response.data.data.url;
            } catch (error) {
                console.error('Error uploading image:', error.message);
            }
        };


        const imgUrl = await uploadImage();

        const User = new user({
            name: req.body.name,
            email: req.body.email,
            profile: imgUrl,
            password: passwordHash
        });

        await User.save();

        res.redirect('/')
    }
    catch (err) {
        console.log(err);
    }
}

const loadLogin = async (req, res) => {
    try {
        res.render('login', { message: "" });
    }
    catch (err) {
        console.log(err);
    }
}
const login = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const userData = await user.findOne({email: email});
        if(userData){
            if(await bcrypt.compare(password, userData.password)){
                req.session.user = userData;
                res.redirect('/dashboard');
            }
            else{
                res.render('login', { message: "Password incorrect, try again." });
            }
        }
        else{
            res.render('login', {message: 'email not found'});
        }
    }
    catch (err) {
        console.log(err);
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log("Error destroying session:", err);
                return res.redirect('/dashboard'); // Redirect to dashboard if there is an error
            }
            // Only redirect after the session is successfully destroyed
            res.redirect('/');
        });
    }
    catch (err) {
        console.log(err);
    }
}

const loadDashboard = async (req, res) => {
    try {
        var otherUsers = await user.find({_id: {$nin: [req.session.user._id]}});
        res.render('dashboard',{user: req.session.user, otherUsers: otherUsers})
    }
    catch (err) {
        console.log(err);
    }
}

const saveChat = async (req, res)=>{
    try{
        var chat = new chatModel({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            msg: req.body.msg
        })
        await chat.save();

        res.status(200).json({
            success:true,
            message: "Chat saved successfully",
            chat: chat
        });
    }
    catch (err) {
        res.status(400).send({
            success:false,
            message:"Failed to save chat: " + err.message
        });
    }
}
module.exports = {
    register, registerLoad,
    loadLogin, login,
    loadDashboard,
    logout,
    saveChat
}