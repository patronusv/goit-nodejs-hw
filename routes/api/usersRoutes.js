const express = require('express');
const router = express.Router();
const ctrlUsers = require('../../controller/usersCtrl');
const { userValidate } = require('../../validation/index');
const guard = require('../../helpers/guard');

router.post('/register', userValidate, ctrlUsers.reg);
router.post('/login', userValidate, ctrlUsers.login);
router.post('/logout', guard, ctrlUsers.logout);
router.get('/current', guard, ctrlUsers.current);

module.exports = router;
