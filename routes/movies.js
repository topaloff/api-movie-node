const express = require('express');
const router = express.Router();
const movie_controller = require('../controller/movie.controller');

router.get('/',movie_controller.movie_list);
router.post('/add',movie_controller.movie_add);
router.post('/actor/:id', movie_controller.movie_add_actor);
router.get('/:id',movie_controller.movie_detail);

module.exports = router;