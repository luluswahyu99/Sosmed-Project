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

module.exports = router;