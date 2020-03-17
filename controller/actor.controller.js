const Actor = require('../models/').Actor;
const Gender = require('../models/').Gender;
const Country = require('../models/').Country;

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
            { model: Country, attributes: ['id','name'] }
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
exports.actor_add = (req,res,next) => {
    Actor.create(req.body)
    .then(actor => {
        res.json(actor);
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
    Actor.update(req.body, {
        where: {
          id: id
        }
    })
    .then(actor => {
        res.json({message: `Actor ${id} est modifie`});
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


