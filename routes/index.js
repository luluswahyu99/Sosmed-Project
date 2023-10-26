const express = require('express');
const Controller = require('../controllers');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect("/register")
  })
// router.get('/register', Controller.registerForm);
// router.post('/register', Controller.registerAuth);
// router.get('/login', Controller.loginForm);
// router.post('/login', Controller.loginVerification);
router.get('/home', Controller.home)
router.get('/:userId/post', Controller.post)
router.post('/:userId/post', Controller.createPost)
router.get('/post/:postId/like', Controller.like)
router.get('/profile/:username', Controller.home)


module.exports = router;