const express = require('express');
const Controller = require('../controllers');
const ControllerLogin = require('../controllers/controllerLogin');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect("/register")
  })
  
router.get('/register', ControllerLogin.registerForm);
router.post('/register', ControllerLogin.registerAuth);
router.get('/login', ControllerLogin.loginForm);
router.post('/login', ControllerLogin.loginVerification);


router.use((req, res, next) => {
  if(!req.session.user){
    const msg = "Please login first"
    res.redirect(`/login?msg=${msg}`)
  }else{
    next();
  }
})

router.get('/home', Controller.home)
router.get('/:userId/post', Controller.post)
router.post('/:userId/post', Controller.createPost)
router.get('/post/:postId/like', Controller.like)
router.get('/profile/:username', Controller.profile)



router.use((req, res, next) => {
  if(!req.session.user){
    const msg = "Please login first"
    res.redirect(`/login?msg=${msg}`)
  }else{
    next();
  }
})



module.exports = router;