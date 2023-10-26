const express = require('express');
const Controller = require('../controllers');
const ControllerLogin = require('../controllers/controllerLogin');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect("/register")
  })

const validateLogin = (req, res, next) => {
  if(req.session.user){
    res.redirect("/home")
  }else {
    next()
  }
}

router.get('/register',validateLogin, ControllerLogin.registerForm);
router.post('/register',validateLogin, ControllerLogin.registerAuth);
router.get('/login',validateLogin, ControllerLogin.loginForm);
router.post('/login',validateLogin, ControllerLogin.loginVerification);

const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isProfile = (req, res, next) => {
  if(req.session.user.profile === null || !req.session.user.profile){
    res.redirect("/profileAdd")
  }else{
    next();
  }
}

router.use(isLoggedIn)

router.get("/logout", ControllerLogin.logout)

router.get("/profileAdd", Controller.addProfile)
router.post("/profileAdd", Controller.addProfileData)
router.get('/home',isProfile , Controller.home)
router.get('/:userId/post',isProfile , Controller.post)
router.post('/:userId/post',isProfile , Controller.createPost)
router.get('/post/:postId/like',isProfile , Controller.like)
router.get('/profile/:username',isProfile , Controller.home)





module.exports = router;