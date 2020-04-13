const Actor = require('../models/').Actor;
const Gender = require('../models/').Gender;
const Movie = require('../models/').Movie;
const MovieActor = require('../models/').MovieActor;
const Country = require('../models/').Country;


const uuidv4 = require("uuid/v4");

const multer = require('multer');

const sequelize = require('sequelize');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/actors');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const upload = multer({ storage });
/**
 * @api {get} /actors Show all actors
 * @apiName getActors
 * @apiGroup Actor
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "Blonde"
 *     }]
 */
exports.actor_list = (req,res,next)=>{
    Actor.findAll({
        attributes: ['id','name','firstname','birth','picture'], //Choose which fields to show
        include : [ //Show the association
            { model: Gender, attributes: ['id','name']},
            { model: Country, attributes: ['id','name'] },
            {
                model: Movie,
                attributes: ['title','description','picture','year','note']
            }   
        ],
        order: [['name', 'ASC']]
    })
    .then(actors => {
        res.json(actors);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 *  * @api {get} /actors/balance Count Percent of male/female/third
 * @apiName getActorsBalance
 * @apiGroup Actor
 * 
 * 
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.actor_balance= (req,res,next)=>{

    Actor.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('genderId')), 'value'],[sequelize.col('Gender.name'), 'data']],
        include : [ 
            { 
                model: Gender,
                attributes: ['name'],
            },
        ],
        group:['genderId'],
        raw: true,
    })
    .then(data => res.json(data))
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {get} /actors/count Count movie by actor
 * @apiName getActorsCount
 * @apiGroup Actor
 * 
 * 
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.actor_count= (req,res,next)=>{
    MovieActor.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('movieId')), 'value']],
        include : [ 
            { 
                model: Actor,
                attributes: ['name','firstname'],
                include : [
                    {
                        model: Gender,
                        attributes: ['name']
                    }
                ]
            },
        ],
        order: [[sequelize.literal('value'), 'DESC']],
        group:['actorId'],
        raw: true,
    })
    .then(data => res.json(data))
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 *  * @api {get} /actors/:id Show detail of one actor
 * @apiName getActorsDetail
 * @apiGroup Actor
 * 
 * @apiParam {Number} id of the Actor
 * 
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.actor_detail = (req,res,next)=>{
    const id = req.params.id
    Actor.findByPk(id)
    .then(actor => {
        res.json(actor);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {post} /actors/add Add one actor
 * @apiName addActor
 * @apiGroup Actor
 * 
 * @apiParam {String} name name of the Actor.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "France"
*     }
 * 
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "France",
 *       "updatedAt": "2020-03-17T15:26:58.984Z",
 *       "createdAt": "2020-03-17T15:26:58.984Z"
 *     }
 */
exports.actor_add =  (req,res,next) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = 'uploads/actors/'+req.file.filename;
    } else {
        console.log('No File Uploaded');
        var filename = '';
    }
    Actor.create({
        id: uuidv4(),
        name: req.body.name,
        firstname: req.body.firstname,
        birth: req.body.birth,
        CountryId: req.body.CountryId,
        GenderId: req.body.GenderId
    })
    .then(actor => {
        const id = actor.id;
        Actor.update({"picture":filename}, {
            where: {
              id: id
            }
        })
        .then(data => {
            res.json(actor);
        })
        .catch(error=>{
            res.status(400);
            res.json(error);
        })
    })  
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


/**
 * @api {put} /actors/edit/:id Edit one actor
 * @apiName editActor
 * @apiGroup Actor
 * 
 * @apiParam {Number} id id of the Actor.
 * @apiParam {String} name name of the Actor.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Blonde"
*     }
 * 
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.actor_edit = (req,res,next) => {
    const id = req.params.id;
    if (req.file) {
        console.log('Uploading file...');
        var filename = 'uploads/actors/'+req.file.filename;
    } else {
        console.log('No File Uploaded');
        var filename = '';
    }
    Actor.update(req.body, {
        where: {
          id: id
        }
    })
    .then(actor => {
        if (req.file) {
            Actor.update({"picture":filename}, {
                where: {
                id: id
                }
            })
            .then(data => {
                res.json({message: `Actor ${id} est modifie`});
            })
            .catch(error=>{
                res.status(400);
                res.json(error);
            })
        }
        else{
            res.json({message: `Actor ${id} est modifie`});
        }
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /actors/delete/:id Delete one actor
 * @apiName deleteActor
 * @apiGroup Actor
 * 
 * @apiParam {Number} id id of the Actor.
 * 
 * @apiSuccess {String} message Actor deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Actor deleted"
 *     }
 */
exports.actor_delete = (req,res,next) => {
    const id = req.params.id;
    Actor.destroy({
        where: {
          id: id
        }
    })
    .then(actor => {
        res.json({message: "Actor deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


/**
 * @api {ActorMovie} /actors/movies/:id Add movie to an actor
 * @apiName addActor
 * @apiGroup Movie
 * 
 * @apiParam {Number} id id of the Movie.
 * 
 * @apiSuccess {String} message Movie deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Movie deleted"
 *     }
 */
exports.actor_add_movie = (req, res, next) => {
    const id = req.params.id;    
    Actor.findByPk(id)
    .then(actor => {
        actor.setMovies(req.body.movieId)
        .then(data => res.json('ok'))
        .catch(error=>{
            res.status(400);
            res.json(error);
        })
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}
