const bodyParser = require('body-parser');
const express = require('express');
const user_route = express.Router();
const path = require('path');
const multer = require('multer');

// Define routes
//bodyParser to user res.body
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

//use public folder
user_route.use(express.static('public'));


const session = require('express-session');
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

const auth = require('../middlewares/auth');

const userController = require('../controllers/userController'); //using module

user_route.get('/register',auth.isLogout, userController.registerLoad);
user_route.post('/register', upload.single('profile'), userController.register);

user_route.get('/',auth.isLogout, userController.loadLogin);
user_route.post('/login', userController.login);

user_route.get('/logout', auth.isLogin, userController.logout);

user_route.get('/dashboard',auth.isLogin, userController.loadDashboard);


// user_route.all('*', (req, res) => {
//   res.redirect('/');
// })

module.exports = user_route; 