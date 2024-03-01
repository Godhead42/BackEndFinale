// userRouter.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/login', (req, res) => {
    res.render('login', {});
});

router.get('/registration', (req, res) => {
    res.render('registration', {});
});

router.post('/registration', UserController.registration);

router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

module.exports = router;
