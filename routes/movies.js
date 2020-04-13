const express = require('express');
const router = express.Router();
const movie_controller = require('../controller/movie.controller');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/movies');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const upload = multer({ storage });

router.get('/',movie_controller.movie_list);
router.get('/best',movie_controller.movie_list_best);
router.post('/actor/:id', movie_controller.movie_add_actor);
router.post('/add',upload.single('picture'),movie_controller.movie_add);
router.put('/edit/:id',upload.single('picture'),movie_controller.movie_edit);
router.delete('/delete/:id', movie_controller.movie_delete);
router.get('/years',movie_controller.movie_list_year);
router.get('/:id',movie_controller.movie_detail);

module.exports = router;