const express = require('express');
const router = express.Router();
const ctrlUsers = require('../../controller/usersCtrl');

router.post('/register', ctrlUsers.reg);
router.post('/login', ctrlUsers.login);
router.post('/logout', ctrlUsers.logout);

module.exports = router;
