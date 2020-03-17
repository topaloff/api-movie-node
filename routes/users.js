var express = require('express');
var router = express.Router();
const user_controller = require('../controller/user.controller');

router.get('/', user_controller.user_list);
router.get('/:id', user_controller.user_detail);
router.post('/signin', user_controller.user_signin);
router.delete('/delete/:id', user_controller.user_delete);
router.post('/login', user_controller.user_login);

module.exports = router;
