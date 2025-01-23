const bodyParser = require('body-parser');
const express = require('express');
const user_route = express.Router();
const path = require('path');
const multer = require('multer');

// Define routes
//bodyParser
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

//use public folder
user_route.use(express.static('public'));


const session = require('express-session');
console.log(process.env.SESSION_SECRET);
user_route.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Prevent resaving sessions that are unchanged
  saveUninitialized: true, // Save sessions even if they are not modified
  cookie: { secure: false } // Set to true if you're using HTTPS
}));

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
user_route.post('/register', upload.single('profile'), userController.register);

user_route.get('/', userController.loadLogin);
user_route.post('/', userController.login);

user_route.get('/logout', userController.logout);

user_route.get('/dashboard', userController.loadDashboard);

user_route.all('*', (req, res) => {
  res.redirect('/');
})

module.exports = user_route; 