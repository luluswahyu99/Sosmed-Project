const express = require('express');
const Controller = require('../controller');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect("/register")
  })
router.get('/register', Controller.registerForm);
router.post('/register', Controller.registerAuth);
router.get('/login', Controller.loginForm);
router.post('/login', Controller.loginVerification);

router.use((req, res, next) => {
  if(!req.session.user){
    const msg = "Please login first"
    res.redirect(`/login?msg=${msg}`)
  }else{
    next();
  }
})



module.exports = router;