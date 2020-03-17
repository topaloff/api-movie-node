const express = require('express');
const router = express.Router();
const actor_controller = require('../controller/actor.controller');

router.get('/',actor_controller.actor_list);
router.post('/add',actor_controller.actor_add);
router.get('/:id',actor_controller.actor_detail);

module.exports = router;