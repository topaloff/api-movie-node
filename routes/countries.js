const express = require('express');
const router = express.Router();
const country_controller = require('../controller/country.controller');

router.get('/',country_controller.country_list);
router.get('/:id',country_controller.country_detail);

module.exports = router;