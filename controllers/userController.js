const user = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerLoad = async(req, res)=>{
    try{
       res.render('register')
    }
    catch(err){
        console.log(err); 
    }
} 

const register = async(req, res)=>{
    try{
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        const User = new user({
            name: req.body.name,
            email: req.body.email,
            profile: req.file.filename,
            password: passwordHash
        });
        await User.save();
        res.render('register', {message: "Register successful!"})
    }
    catch(err){
        console.log(err); 
    }
}

module.exports = {
    register,
    registerLoad
}