const express = require('express');
const userController = require('../Controllers/userControllers');

const auth = require("../Middlewares/auth")

const router = express.Router();

router.route('/').get(auth, userController.getAllUsers);
router.route('/register').post(userController.registerNewUser);
router.route('/login').post(userController.login);

module.exports = router;
