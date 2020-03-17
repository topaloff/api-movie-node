const express = require('express');
const router = express.Router();
const gender_controller = require('../controller/gender.controller');

router.get('/',gender_controller.gender_list);
router.post('/add',gender_controller.gender_add);
router.get('/:id',gender_controller.gender_detail);

module.exports = router;