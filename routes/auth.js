const express = require('express');
const router = express.Router();

const userController = require("../controllers/user");
router.get('/auth/signup', function(req, res) {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('pages/auth/signup', {
    path: '/auth/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
});

router.get('/auth/signin', function(req, res) {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('pages/auth/signin', {
    path: '/auth/signin',
    pageTitle: 'Login',
    errorMessage: message
  });
});

router.post('/createUser', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/logout', userController.logout);

module.exports = router;
