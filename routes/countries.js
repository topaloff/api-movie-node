const express = require('express');
const router = express.Router();
const country_controller = require('../controller/country.controller');

router.get('/',country_controller.country_list);
router.post('/add',country_controller.country_add);
router.put('/edit/:id',country_controller.country_edit);
router.delete('/delete/:id', country_controller.country_delete);
router.get('/:id',country_controller.country_detail);

module.exports = router;