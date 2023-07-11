const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/', async function (req, res) {
  res.render('pages/home', {user: req.session.user || undefined });
});


router.get('/about', isAuth, function (req, res) {
  res.render('pages/about');
});

router.get('/resetPassword', function (req, res) {
  res.render('pages/resetPassword');
});


module.exports = router;