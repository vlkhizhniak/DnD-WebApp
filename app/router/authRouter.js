const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.indexlogin);
router.get('/signup', authController.indexsignup)
router.post('/signup', authController.signup)

module.exports = router;