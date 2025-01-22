const bodyParser = require('body-parser');
const express = require('express');
const user_route  = express.Router();
const path = require('path');
const multer = require('multer');

// Define routes
//bodyParser
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

//use public folder
user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix)
    }
  });
const upload = multer({ storage: storage });

const userController = require('../controllers/userController'); //using module
user_route.get('/register', userController.registerLoad);
user_route.post('/register',upload.single('profile'), userController.register);
module.exports = user_route;
  
