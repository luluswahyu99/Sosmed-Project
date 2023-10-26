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

router.use(isLoggedIn)

router.get("/profileAdd", Controller.addProfile)
router.post("/profileAdd", Controller.addProfileData)
router.get('/home', Controller.home)
router.get('/:userId/post', Controller.post)
router.post('/:userId/post', Controller.createPost)
router.get('/post/:postId/like', Controller.like)
router.get('/profile/:username', Controller.profile)
router.get('/post/:postId/delete', Controller.deletePost)
router.get('/profile/:username/edit', Controller.editProfile)
router.post('/profile/:username/edit')




module.exports = router;