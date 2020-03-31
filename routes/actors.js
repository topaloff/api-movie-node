const express = require('express');
const router = express.Router();
const actor_controller = require('../controller/actor.controller');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/actors');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const upload = multer({ storage });

router.get('/',actor_controller.actor_list);
router.post('/add',upload.single('picture'),actor_controller.actor_add);
router.put('/edit/:id',upload.single('picture'),actor_controller.actor_edit);
router.delete('/delete/:id', actor_controller.actor_delete);
router.get('/:id',actor_controller.actor_detail);

module.exports = router;