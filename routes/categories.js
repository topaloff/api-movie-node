const express = require('express');
const router = express.Router();
const category_controller = require('../controller/category.controller');

router.get('/',category_controller.category_list);
router.post('/add',category_controller.category_add);
router.get('/:id',category_controller.category_detail);

module.exports = router;